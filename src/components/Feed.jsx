import { useContext, useEffect, useState } from "react";
import FeedCSS from "../style/Feed.module.css";
import WindowHeader from "./WindowHeader";
import { ethers } from "ethers";
import { AppContext } from "../App";
import axios from "axios";
/* global BigInt */
import unknownLogo from "../assets/unknownlogo.png";
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
import { set, get, ref } from "firebase/database";

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

const ERC20_ABI = [
  // Read-Only Functions
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

//some tokens don't completely adhere to the ERC20 standard and use a bytes32 object as a symbol, such as MKR
const ERC20_ABI_2 = [
  // Read-Only Functions
  "function decimals() view returns (uint8)",
  "function symbol() view returns (bytes32)",
];

const ERC721_ABI = [
  //methods
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  // {
  //   inputs: [],
  //   name: "totalSupply",
  //   outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //   stateMutability: "view",
  //   type: "function",
  //   constant: true,
  // },
];

const transactionsInLS = window.localStorage
  ? JSON.parse(localStorage.getItem("feedTransactions"))
  : null;

/**
 * The Feed component displays transactions and their associated info 
 * for addresses in the watchlist for the connected wallet.
 * @param { block,
  addresses,
  setAddresses,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
  setTrollboxFormMessage, } props
 */
const Feed = ({
  block,
  addresses,
  setAddresses,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
  setTrollboxFormMessage,
}) => {
  const { database, provider, account } = useContext(AppContext);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  //add filterredTransactions to feedTransactions in useEffect?
  const [feedTransactions, setFeedTransactions] = useState(
    (transactionsInLS && transactionsInLS.feedTransactions) || []
  );
  const [lastBlockNum, setLastBlockNum] = useState(null);
  const [prevBlockNum, setPrevBlockNum] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  /**
   * Checks if the logs for a given txn contain the ETH symbol.
   * @param { * } logs
   * @param { * } index
   */
  const checkLogsForETH = (logs, index) => {
    return (
      logs[index] !== undefined &&
      logs[index].symbol.toUpperCase().includes("ETH") &&
      logs[index].value > 100
    );
  };

  /**
   * Checks if the logs for a given txn contain the USD symbol.
   * @param { * } logs
   * @param { * } index
   */
  const checkLogsForUSD = (logs, index) => {
    return (
      logs[index] !== undefined &&
      (logs[index].symbol.toUpperCase().includes("USD") ||
        logs[index].symbol === "DAI") &&
      logs[index].value > 500000
    );
  };

  /**
   * Checks if the logs for a given txn contain the BTC symbol.
   * @param { * } logs
   * @param { * } index
   */
  const checkLogsForBTC = (logs, index) => {
    return (
      logs[index] !== undefined &&
      logs[index].symbol.toUpperCase().includes("BTC") &&
      logs[index].value > 10
    );
  };

  /**
   * Get the image for an ERC721 token from its URI.
   * @param { * } URI
   */
  const getImageFromURI = async (URI) => {
    console.log("getImageForTokenID...");
    if (URI.substring(0, 4).includes("ipfs")) {
      const gatewayURI = `https://ipfs.io/ipfs/${URI.substring(7)}`;
      const res = await axios.get(gatewayURI);
      const imageURL = res.data.image
        ? `https://ipfs.io/ipfs/${res.data.image.substring(7)}`
        : unknownLogo;
      return imageURL;
    } else {
      try {
        const res = await axios.get(URI);
        let imageURL = res.data.image;
        if (!imageURL) {
          imageURL = unknownLogo;
        } else if (imageURL.substring(0, 4).includes("ipfs")) {
          imageURL = `https://ipfs.io/ipfs/${imageURL.substring(7)}`;
        }
        return imageURL;
      } catch (e) {
        console.log(e);
        console.log(`No nft image found from imageURL, setting default...`);
        return unknownLogo;
      }
    }
  };

  /**
   * Get desire info from logs associated with a txn and add them to decodedLogs object.
   * @param { * } logs
   */
  const decodeLogs = async (logs) => {
    let decodedLogs = [];
    let isNFTLog = false;
    let hasFailedLog = false;
    for (const log of logs) {
      try {
        const contractAddress = log.address;
        /**ERC-20/ERC-721 transfer event */
        if (
          log.topics[0] ===
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ) {
          const from = `0x${log.topics[1].substring(26)}`;
          const to = `0x${log.topics[2].substring(26)}`;
          //is ERC721
          if (log.topics[3]) {
            isNFTLog = true;
            const bn = BigInt(log.topics[3]); // BigInt for large token IDs such as ens
            const tokenID = bn.toString(10);
            //if ens transfer
            if (
              contractAddress == "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"
            ) {
              const symbol = "ENS";
              const nameData = await axios.get(
                `https://metadata.ens.domains/mainnet/${contractAddress}/${tokenID}`
              );
              decodedLogs.push({
                event: "Transfer",
                name: nameData.data.name,
                symbol: symbol,
                from: from,
                to: to,
                tokenID: tokenID,
                contractAddress: contractAddress,
                image: nameData.data.image_url,
              });
            } else {
              const contract = new ethers.Contract(
                contractAddress,
                ERC721_ABI,
                provider
              );
              const symbol = await contract.symbol();
              const name = await contract.name();
              const URI = await contract.tokenURI(tokenID);
              const image = await getImageFromURI(URI);
              decodedLogs.push({
                event: "Transfer",
                name: name,
                symbol: symbol,
                from: from,
                to: to,
                tokenID: tokenID,
                contractAddress: contractAddress,
                image: image,
              });
            }
          } else {
            //is ERC20
            let contract = new ethers.Contract(
              contractAddress,
              ERC20_ABI,
              provider
            );
            const decimals = await contract.decimals();
            const value = (
              parseFloat(
                ethers.utils.defaultAbiCoder.decode(["uint256"], log.data)[0]
              ) / Math.pow(10, decimals)
            ).toFixed(5);
            try {
              var symbol = await contract.symbol();
            } catch (e) {
              contract = new ethers.Contract(
                contractAddress,
                ERC20_ABI_2,
                provider
              );
              symbol = await contract.symbol();
              symbol = ethers.utils.parseBytes32String(symbol);
            }
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
      } catch (e) {
        console.log(e);
        console.log("Couldn't add a log, adding failed log");
        decodedLogs.push({ failed: true });
        hasFailedLog = true;
        continue;
      }
    }
    console.log("LOGS DECODED: ", { isNFTLog, hasFailedLog, decodedLogs });
    return { isNFTLog, hasFailedLog, decodedLogs };
  };

  /**
   * Build the filteredTransactions object by getting necessary info from newFilteredTxns.
   * @param { * } newFilteredTxns
   * @param { * } timestamp
   */
  const buildFilteredTransactions = async (newFilteredTxns, timestamp) => {
    let filteredTxns = [];
    for (let i = 0; i < newFilteredTxns.length; i++) {
      const value = newFilteredTxns[i].value;
      let filteredTxn = await provider.getTransactionReceipt(
        newFilteredTxns[i].hash
      );

      console.log(newFilteredTxns[i]);
      //fixes issue where rarely null transactions returned from receipt, not sure why
      if (filteredTxn === null) {
        console.log("Skipped null transaction...");
        continue;
      }
      const convertedTimestamp = new Date(timestamp * 1000).toISOString();

      filteredTxn.timestamp = `${convertedTimestamp.substring(
        0,
        convertedTimestamp.indexOf("T")
      )} ${convertedTimestamp.substring(
        convertedTimestamp.indexOf("T") + 1,
        convertedTimestamp.indexOf(".")
      )} UTC`;

      filteredTxn.value = parseFloat(ethers.utils.formatEther(value)).toFixed(
        2
      );
      filteredTxn.toAddressInfo = addresses.find((address) =>
        filteredTxn.to
          ? address.address.toLowerCase() === filteredTxn.to.toLowerCase()
          : null
      );
      filteredTxn.fromAddressInfo = addresses.find(
        (address) =>
          address.address.toLowerCase() === filteredTxn.from.toLowerCase()
      );
      //if there are logs, decode them and set logs to that
      if (filteredTxn.logs.length > 0) {
        const { isNFTLog, hasFailedLog, decodedLogs } = await decodeLogs(
          filteredTxn.logs
        );
        if (!isNFTLog && !hasFailedLog && decodedLogs.length > 1) {
          const usdSell = checkLogsForUSD(decodedLogs, 0);
          const ethSell = !usdSell && checkLogsForETH(decodedLogs, 0);
          const btcSell =
            !usdSell && !ethSell && checkLogsForBTC(decodedLogs, 0);
          const usdBuy = checkLogsForUSD(decodedLogs, decodedLogs.length - 1);
          const ethBuy =
            !ethSell &&
            !usdBuy &&
            checkLogsForETH(decodedLogs, decodedLogs.length - 1);
          const btcBuy =
            !btcSell &&
            !usdBuy &&
            !ethBuy &&
            checkLogsForBTC(decodedLogs, decodedLogs.length - 1);
          filteredTxn.usdSell = usdSell;
          filteredTxn.ethSell = ethSell;
          filteredTxn.btcSell = btcSell;
          filteredTxn.usdBuy = usdBuy;
          filteredTxn.ethBuy = ethBuy;
          filteredTxn.btcBuy = btcBuy;
        } else if (!isNFTLog && !hasFailedLog && decodedLogs.length === 1) {
          const usdTransfer = checkLogsForUSD(decodedLogs, 0);
          const ethTransfer = checkLogsForETH(decodedLogs, 0);
          const btcTransfer = checkLogsForBTC(decodedLogs, 0);
          filteredTxn.usdTransfer = usdTransfer;
          filteredTxn.ethTransfer = ethTransfer;
          filteredTxn.btcTransfer = btcTransfer;
        }
        filteredTxn.logs = decodedLogs;
      }
      filteredTxns.push(filteredTxn);
    }

    return filteredTxns;
  };

  useEffect(() => {
    setLastBlockNum(null);
    //setPrevBlockNum(null)
  }, [isPaused]);

  useEffect(() => {
    if (!account) {
      setFeedTransactions([]);
      setFilteredTransactions([]);
      setAddresses([]);
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
      let newFilteredTxns = [];
      try {
        //if there is no last block or missed blocks simply filter the current block
        if (!lastBlockNum || lastBlockNum + 1 === block.number) {
          console.log("No blocks skipped, filtering current block...");
          console.log("Filtering Block " + block.number);
          newFilteredTxns = block.transactions.filter(filter);
          if (newFilteredTxns.length > 0) {
            console.log("Transactions found: ", newFilteredTxns);
            //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
            newFilteredTxns = await buildFilteredTransactions(
              newFilteredTxns,
              block.timestamp
            );
            console.log(
              "Setting Filtered Transactions to ... ",
              newFilteredTxns
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
            let blockToAddFilteredTxns = null;
            if (blockNumToAdd === block.mumber) {
              blockToAdd = block;
              timestamp = block.timestamp;
              blockToAddFilteredTxns = block.transactions.filter(filter);
            } else {
              blockToAdd = await provider.getBlockWithTransactions(
                blockNumToAdd
              );
              timestamp = blockToAdd.timestamp;
              blockToAddFilteredTxns = blockToAdd.transactions.filter(filter);
            }
            console.log("Filtering Block " + blockNumToAdd);
            //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
            if (blockToAddFilteredTxns.length > 0) {
              console.log("Transactions found1: ", blockToAddFilteredTxns);
              newFilteredTxns = newFilteredTxns.concat(
                await buildFilteredTransactions(
                  blockToAddFilteredTxns,
                  timestamp
                )
              );
              console.log(
                "Setting Filtered Transactions to: ",
                newFilteredTxns
              );
            } else {
              console.log("No matching transactions in block " + blockNumToAdd);
            }
          }
        }

        if (newFilteredTxns.length > 0) {
          console.log("Filtering done, setting filtered transactions.");
          setFilteredTransactions(newFilteredTxns);
        }
        //copy of last block to track last black for use in feedtable detecting if txn is new
        if (lastBlockNum) {
          setPrevBlockNum(lastBlockNum);
        }
        //set last block for forward for next iteration
        setLastBlockNum(block.number);
      } catch (e) {
        console.log("Error in filterTransactions...");
        console.log(e);
      }
    };
    //check if any blocks were skipped
    filterTransactions();
  }, [block]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(
          "feedTransactions",
          JSON.stringify({
            feedTransactions,
          })
        );
      } catch (e) {
        alert(
          "Your feed is at max capacity. Delete some transactions or clear your feed to continue having persistence between sessions."
        );
      }
    }
  }, [feedTransactions]);

  //called when filtered transactions is set, ensures feed is updated after
  useEffect(() => {
    if (filteredTransactions.length === 0) {
      console.log("Filtered transactions set to empty...");
      return;
    }
    console.log(
      "Filtered transactions changed. Setting numTransactionsWatched and concatenating filtered transactions..."
    );
    get(ref(database, `users/${account}/numTransactionsWatched`)).then(
      (snapshot) => {
        const prevNumTransactionsWatched = snapshot.val();
        set(
          ref(database, `users/${account}/numTransactionsWatched`),
          prevNumTransactionsWatched + filteredTransactions.length
        );
      }
    );
    let newFeedTxns = null;
    //for initial load
    if (feedTransactions && feedTransactions.length === 0) {
      newFeedTxns = filteredTransactions.reverse();
    } else {
      newFeedTxns = filteredTransactions.reverse().concat(feedTransactions);
    }
    console.log("Setting Feed transactions to: ", newFeedTxns);
    setFeedTransactions(newFeedTxns);

    //if user doesn't have feed muted
    if (!isMuted) {
      //play sounds for various value sizes
      if (filteredTransactions.some((txn) => txn.contractAddress !== null)) {
        creationAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdBuy || txn.ethSell || txn.btcSell
        )
      ) {
        dompeetAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdSell || txn.ethBuy || txn.btcBuy
        )
      ) {
        pompeetAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 5000)) {
        holyshitAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 1000)) {
        jesusAudio.play();
      } else if (
        filteredTransactions.some(
          (txn) => txn.usdTransfer || txn.ethTransfer || txn.btcTransfer
        )
      ) {
        transferAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 500)) {
        massiveAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 100)) {
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
          setTrollboxFormMessage={setTrollboxFormMessage}
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
