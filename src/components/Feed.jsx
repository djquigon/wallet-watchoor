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

const smallAudio = new Audio(smallSFX);
const mediumAudio = new Audio(mediumSFX);
const largeAudio = new Audio(largeSFX);
const massiveAudio = new Audio(massiveSFX);
const jesusAudio = new Audio(jesusSFX);
const holyshitAudio = new Audio(holyshitSFX);
const creationAudio = new Audio(creationSFX);

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

const Feed = ({ block, account, addresses, removeItem, addItem }) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  //add filterredTransactions to feedTransactions in useEffect?
  const [feedTransactions, setFeedTransactions] = useState([]);
  const [lastBlockNum, setLastBlockNum] = useState(null);
  const [prevBlockNum, setPrevBlockNum] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

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
    console.log("LOGS DECODED.....", decodedLogs);
    return decodedLogs;
  };

  const filterTransactions = async () => {
    const watchedAddresses = addresses
      .filter((address) => address.alerts === true)
      .map((address) => address.address.toLowerCase());
    console.log("Watched addresses to filter...");
    console.log(watchedAddresses);
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
    console.log("Filtering Block " + block.number);
    let newFilteredTransactions = [];
    //if there is no last block or missed blocks simply filter the current block
    if (!lastBlockNum || lastBlockNum + 1 === block.number) {
      console.log("No blocks skipped, filtering current block...");
      console.log("Transactions found:");
      newFilteredTransactions = block.transactions.filter(filter);
      if (newFilteredTransactions.length > 0) {
        //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
        for (let i = 0; i < newFilteredTransactions.length; i++) {
          const value = newFilteredTransactions[i].value;
          newFilteredTransactions[i] = await provider.getTransactionReceipt(
            newFilteredTransactions[i].hash
          );
          newFilteredTransactions[i].timestamp = block.timestamp;
          newFilteredTransactions[i].value = parseFloat(
            ethers.utils.formatEther(value)
          ).toFixed(3);
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
            const decodedLogs = await decodeLogs(
              newFilteredTransactions[i].logs
            );
            console.log(decodedLogs);
            newFilteredTransactions[i].logs = decodedLogs;
          }
        }
        console.log("Setting Filtered Transactions to ...");
        console.log(newFilteredTransactions);
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
          blockToAddFilteredTransactions = block.transactions.filter(filter);
        } else {
          blockToAdd = await provider.getBlockWithTransactions(blockNumToAdd);
          timestamp = blockToAdd.timestamp;
          blockToAddFilteredTransactions =
            blockToAdd.transactions.filter(filter);
        }
        console.log("Filtering Block " + blockNumToAdd);
        console.log("Transactions found:");
        console.log(blockToAddFilteredTransactions);
        //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
        if (blockToAddFilteredTransactions.length > 0) {
          for (let i = 0; i < blockToAddFilteredTransactions.length; i++) {
            const value = blockToAddFilteredTransactions[i].value;
            blockToAddFilteredTransactions[i] =
              await provider.getTransactionReceipt(
                blockToAddFilteredTransactions[i].hash
              );
            // console.log("DOOODOOOODOOOO", blockToAddFilteredTransactions[i]);
            blockToAddFilteredTransactions[i].timestamp = timestamp;
            blockToAddFilteredTransactions[i].value = parseFloat(
              ethers.utils.formatEther(value)
            ).toFixed(3);
            blockToAddFilteredTransactions[i].toAddressInfo = addresses.find(
              (address) =>
                blockToAddFilteredTransactions[i].to
                  ? address.address.toLowerCase() ===
                    blockToAddFilteredTransactions[i].to.toLowerCase()
                  : null
            );
            blockToAddFilteredTransactions[i].fromAddressInfo = addresses.find(
              (address) =>
                address.address.toLowerCase() ===
                blockToAddFilteredTransactions[i].from.toLowerCase()
            );
            //if there are logs, decode them and set logs to that
            if (blockToAddFilteredTransactions[i].logs.length > 0) {
              const decodedLogs = await decodeLogs(
                blockToAddFilteredTransactions[i].logs
              );
              console.log(decodedLogs);
              blockToAddFilteredTransactions[i].logs = decodedLogs;
            }
          }
          console.log("Setting Filtered Transactions to ...");
          newFilteredTransactions = newFilteredTransactions.concat(
            blockToAddFilteredTransactions
          );
          console.log(newFilteredTransactions);
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
    //check if any blocks were skipped
    filterTransactions();
  }, [block]); //addresses maybe account

  //called when filtered transactions is set, ensures feed is updated after
  useEffect(() => {
    console.log(
      "Filtered transactions changed. Concatenating filtered transactions..."
    );
    console.log("Setting Feed transactions to...");
    let newFeedTransactions = null;
    //for initial load
    if (feedTransactions.length === 0) {
      newFeedTransactions = filteredTransactions.reverse();
      console.log(newFeedTransactions);
    } else {
      newFeedTransactions = filteredTransactions
        .reverse()
        .concat(feedTransactions);
      console.log(newFeedTransactions);
    }
    setFeedTransactions(newFeedTransactions);

    //if user doesn't have feed muted
    if (!isMuted) {
      //play sounds for various value sizes
      if (filteredTransactions.some((txn) => txn.contractAddress !== null)) {
        creationAudio.play();
      } else if (filteredTransactions.some((txn) => txn.value >= 1000)) {
        holyshitAudio.play();
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
  }, [filteredTransactions]);

  return (
    <div id={FeedCSS.feed}>
      <WindowHeader window="Feed" removeItem={removeItem} addItem={addItem} />
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
    </div>
  );
};

export default Feed;
