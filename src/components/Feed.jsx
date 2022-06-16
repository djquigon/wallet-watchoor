import { useEffect, useState } from "react";
import FeedCSS from "../style/Feed.module.css";
import WindowHeader from "./WindowHeader";
import { ethers } from "ethers";
import FeedTable from "./FeedTable";
// "UI_3-1 FHSandal sinus(Sytrus,arpegio,multiprocessing,rsmpl).wav" by newlocknew of Freesound.org
import smallSFX from "../assets/sfx/smallSFX.wav";
// "UI_1 Sweet saw(Sytrus,arpegio,multiprocessing,rsmpl).wav" by newlocknew of Freesound.org
import mediumSFX from "../assets/sfx/mediumSFX.wav";
// "UI Confirmation Alert, C3.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
import largeSFX from "../assets/sfx/largeSFX.wav";
// "UI Confirmation Alert, D1.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
import massiveSFX from "../assets/sfx/massiveSFX.wav";
import jesusSFX from "../assets/sfx/jesusSFX.wav";
import holyshitSFX from "../assets/sfx/holyshitSFX.wav";
import creationSFX from "../assets/sfx/creationSFX.wav";
import dompeetSFX from "../assets/sfx/dompeetSFX.wav";
import pompeetSFX from "../assets/sfx/pompeetSFX.wav";
import transferSFX from "../assets/sfx/transferSFX.wav";

const smallAudio = new Audio(smallSFX);
const mediumAudio = new Audio(mediumSFX);
const largeAudio = new Audio(largeSFX);
const massiveAudio = new Audio(massiveSFX);
const jesusAudio = new Audio(jesusSFX);
const holyshitAudio = new Audio(holyshitSFX);
const creationAudio = new Audio(creationSFX);
const dompeetAudio = new Audio(dompeetSFX);
const pompeetAudio = new Audio(pompeetSFX);
const transferAudio = new Audio(transferSFX);

const provider = new ethers.providers.Web3Provider(window.ethereum);
const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const transactionsInLS = window.localStorage
  ? JSON.parse(localStorage.getItem("feedTransactions"))
  : null;

const Feed = ({
  block,
  account,
  addresses,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
}) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  //add filterredTransactions to feedTransactions in useEffect?
  const [feedTransactions, setFeedTransactions] = useState(
    (transactionsInLS && transactionsInLS.feedTransactions) || []
  );
  const [lastBlockNum, setLastBlockNum] = useState(null);
  const [prevBlockNum, setPrevBlockNum] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const checkLogsForETH = (logs, index) => {
    return (
      logs[index] !== undefined &&
      logs[index].symbol.toUpperCase().includes("ETH") &&
      logs[index].value > 100
    );
  };

  const checkLogsForUSD = (logs, index) => {
    return (
      logs[index] !== undefined &&
      (logs[index].symbol.toUpperCase().includes("USD") ||
        logs[index].symbol === "DAI") &&
      logs[index].value > 100000
    );
  };

  const decodeLogs = async (logs) => {
    let decodedLogs = [];
    for (const log of logs) {
      const contractAddress = log.address;
      /**ERC-20 transfer event */
      if (
        log.topics[0] ===
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      ) {
        const from = `0x${log.topics[1].substring(26)}`;
        const to = `0x${log.topics[2].substring(26)}`;
        const contract = new ethers.Contract(
          contractAddress,
          ERC20_ABI,
          provider
        );
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const value = (
          parseFloat(
            ethers.utils.defaultAbiCoder.decode(["uint256"], log.data)[0]
          ) / Math.pow(10, decimals)
        ).toFixed(5);
        decodedLogs.push({
          event: "Transfer",
          value: value,
          symbol: symbol,
          from: from,
          to: to,
          decimals: decimals,
          contractAddress: contractAddress,
        });
      }
    }
    console.log("LOGS DECODED: ", decodedLogs);
    return decodedLogs;
  };

  const buildFilteredTransactions = async (
    newFilteredTransactions,
    timestamp
  ) => {
    //in case of a txn filtering returning a null value due to bug i have yet to figure out
    newFilteredTransactions = newFilteredTransactions.filter(
      (txn) => txn !== null
    );

    for (let i = 0; i < newFilteredTransactions.length; i++) {
      const value = newFilteredTransactions[i].value;
      newFilteredTransactions[i] = await provider.getTransactionReceipt(
        newFilteredTransactions[i].hash
      );
      // console.log("DOOODOOOODOOOO", newFilteredTransactions[i]);
      newFilteredTransactions[i].timestamp = timestamp;
      newFilteredTransactions[i].value = parseFloat(
        ethers.utils.formatEther(value)
      ).toFixed(2);
      newFilteredTransactions[i].toAddressInfo = addresses.find((address) =>
        newFilteredTransactions[i].to
          ? address.address.toLowerCase() ===
            newFilteredTransactions[i].to.toLowerCase()
          : null
      );
      newFilteredTransactions[i].fromAddressInfo = addresses.find(
        (address) =>
          address.address.toLowerCase() ===
          newFilteredTransactions[i].from.toLowerCase()
      );
      //if there are logs, decode them and set logs to that
      if (newFilteredTransactions[i].logs.length > 0) {
        const decodedLogs = await decodeLogs(newFilteredTransactions[i].logs);
        if (decodedLogs.length > 1) {
          const usdSell = checkLogsForUSD(decodedLogs, 0);
          const ethSell = !usdSell && checkLogsForETH(decodedLogs, 0);
          const usdBuy = checkLogsForUSD(decodedLogs, decodedLogs.length - 1);
          const ethBuy =
            !usdBuy && checkLogsForETH(decodedLogs, decodedLogs.length - 1);
          newFilteredTransactions[i].usdSell = usdSell;
          newFilteredTransactions[i].usdBuy = usdBuy;
          newFilteredTransactions[i].ethSell = ethSell;
          newFilteredTransactions[i].ethBuy = ethBuy;
        } else {
          const usdTransfer = checkLogsForUSD(decodedLogs, 0);
          const ethTransfer = checkLogsForETH(decodedLogs, 0);
          newFilteredTransactions[i].usdTransfer = usdTransfer;
          newFilteredTransactions[i].ethTransfer = ethTransfer;
        }
        newFilteredTransactions[i].logs = decodedLogs;
      }
    }
    return newFilteredTransactions;
  };

  useEffect(() => {
    setLastBlockNum(null);
    //setPrevBlockNum(null)
  }, [isPaused]);

  useEffect(() => {
    if (!account) {
      setFeedTransactions([]);
    }
  }, [account]);

  useEffect(() => {
    const filterTransactions = async () => {
      //if fee is paused, or account block or addresses are null or lastBlockNum is still this block
      if (
        isPaused ||
        !account ||
        !block ||
        !addresses ||
        lastBlockNum === block.number
      ) {
        console.log("Not filtering transactions...");
        // setIsPaused(true)
        return;
      }
      const watchedAddresses = addresses
        .filter((address) => address.alerts === true)
        .map((address) => address.address.toLowerCase());
      console.log("Watched addresses to filter: ", watchedAddresses);

      //function to filter out only txns from watchedAddresses
      function filter(transaction) {
        //in case of contract creation where to is null
        if (transaction.to) {
          return (
            watchedAddresses.includes(transaction.from.toLowerCase()) ||
            watchedAddresses.includes(transaction.to.toLowerCase())
          );
        } else {
          return watchedAddresses.includes(transaction.from.toLowerCase());
        }
      }

      console.log("Last block " + lastBlockNum);
      let newFilteredTransactions = [];
      try {
        //if there is no last block or missed blocks simply filter the current block
        if (!lastBlockNum || lastBlockNum + 1 === block.number) {
          console.log("No blocks skipped, filtering current block...");
          console.log("Filtering Block " + block.number);
          newFilteredTransactions = block.transactions.filter(filter);
          if (newFilteredTransactions.length > 0) {
            console.log("Transactions found: ", newFilteredTransactions);
            //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
            newFilteredTransactions = await buildFilteredTransactions(
              newFilteredTransactions,
              block.timestamp
            );
            console.log(
              "Setting Filtered Transactions to ... ",
              newFilteredTransactions
            );
          } else {
            console.log("No matching transactions in block " + block.number);
          }
          //if there is a last block and there are missed blocks , add them to newFilteredTransactions
        } else {
          console.log(
            "Blocks were skipped, filtering all skipped blocks and current block..."
          );
          for (
            let blockNumToAdd = lastBlockNum + 1;
            blockNumToAdd <= block.number;
            blockNumToAdd++
          ) {
            let blockToAdd = null;
            let timestamp = null;
            let blockToAddFilteredTransactions = null;
            if (blockNumToAdd === block.mumber) {
              blockToAdd = block;
              timestamp = block.timestamp;
              blockToAddFilteredTransactions =
                block.transactions.filter(filter);
            } else {
              blockToAdd = await provider.getBlockWithTransactions(
                blockNumToAdd
              );
              timestamp = blockToAdd.timestamp;
              blockToAddFilteredTransactions =
                blockToAdd.transactions.filter(filter);
            }
            console.log("Filtering Block " + blockNumToAdd);
            //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
            if (blockToAddFilteredTransactions.length > 0) {
              console.log(
                "Transactions found1: ",
                blockToAddFilteredTransactions
              );
              newFilteredTransactions = newFilteredTransactions.concat(
                await buildFilteredTransactions(
                  blockToAddFilteredTransactions,
                  timestamp
                )
              );
              console.log(
                "Setting Filtered Transactions to: ",
                newFilteredTransactions
              );
            } else {
              console.log("No matching transactions in block " + blockNumToAdd);
            }
          }
        }
        //newFilteredTransactions = block.transactions.filter(filter)

        if (newFilteredTransactions.length > 0) {
          console.log("Filtering done, setting filtered transactions.");
          setFilteredTransactions(newFilteredTransactions);
        }
        //copy of last block to track last black for use in feedtable detecting if txn is new
        if (lastBlockNum) {
          setPrevBlockNum(lastBlockNum);
        }
        //set last block for forward for next iteration
        setLastBlockNum(block.number);
      } catch (e) {
        alert(e);
        console.log(e);
      }
    };
    //check if any blocks were skipped
    filterTransactions();
  }, [block]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(
        "feedTransactions",
        JSON.stringify({
          feedTransactions,
        })
      );
    }
  }, [feedTransactions]);

  //called when filtered transactions is set, ensures feed is updated after
  useEffect(() => {
    console.log(
      "Filtered transactions changed. Concatenating filtered transactions..."
    );
    let newFeedTransactions = null;
    //for initial load
    if (feedTransactions.length === 0) {
      newFeedTransactions = filteredTransactions.reverse();
    } else {
      newFeedTransactions = filteredTransactions
        .reverse()
        .concat(feedTransactions);
    }
    console.log("Setting Feed transactions to: ", newFeedTransactions);
    setFeedTransactions(newFeedTransactions);

    //if user doesn't have feed muted
    if (!isMuted) {
      //play sounds for various value sizes
      if (filteredTransactions.some((txn) => txn.contractAddress !== null)) {
        creationAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdBuy === true || txn.ethSell === true
        )
      ) {
        dompeetAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdSell === true || txn.ethBuy === true
        )
      ) {
        pompeetAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 1000)) {
        holyshitAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdTransfer === true || txn.ethTransfer === true
        )
      ) {
        transferAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 500)) {
        jesusAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 100)) {
        massiveAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 50)) {
        largeAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 10)) {
        mediumAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 1)) {
        smallAudio.play();
        //remove but keep for testing for now
      }
    }
  }, [filteredTransactions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id={FeedCSS.feed}>
      <WindowHeader
        window="Feed"
        removeItem={removeItem}
        addItem={addItem}
        isItemStatic={isItemStatic}
        setItemStatic={setItemStatic}
      />

      {account ? (
        <FeedTable
          account={account}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          feedTransactions={feedTransactions}
          setFeedTransactions={setFeedTransactions}
          currBlockNum={block ? block.number : null}
          prevBlockNum={prevBlockNum}
        />
      ) : (
        <p style={{ marginTop: "30%", height: "100%" }}>
          Your wallet is not connected.
        </p>
      )}
    </div>
  );
};

export default Feed;
