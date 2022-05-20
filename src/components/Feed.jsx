import {useEffect, useState} from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import { ethers } from 'ethers';
import FeedTable from './FeedTable';

const provider = new ethers.providers.Web3Provider(window.ethereum)

const Feed = ({block, account, addresses}) => {

    const [filteredTransactions, setFilteredTransactions] = useState([])
    //add filterredTransactions to feedTransactions in useEffect?
    const [feedTransactions, setFeedTransactions] = useState([])
    const [lastBlockNum, setLastBlockNum] = useState(null)
    const [prevBlockNum, setPrevBlockNum] = useState(null)
    const [isPaused, setIsPaused] = useState(false)

    const decodeLogs = (logs) => {
        
    }

    const filterTransactions = async () => {
        const watchedAddresses = addresses.filter(address => address.alerts === true).map(address => address.address)
        console.log("Watched addresses to filter...")
        console.log(watchedAddresses)
        function filter(transaction){
            //in case of contract creation where to is null
            if(transaction.to){
                return watchedAddresses.includes(transaction.from.toLowerCase())
                || watchedAddresses.includes(transaction.to.toLowerCase())
            }
            else{
                return watchedAddresses.includes(transaction.from.toLowerCase())
            }
        }
        console.log("Last block " + lastBlockNum)
        console.log("Filtering Block " + block.number)
        let newFilteredTransactions = []
        //if there is no last block or missed blocks simply filter the current block
        if(!lastBlockNum || lastBlockNum + 1 === block.number){
            console.log("No blocks skipped, filtering current block...")
            console.log("Transactions found:")
            newFilteredTransactions = block.transactions.filter(filter)
            if(newFilteredTransactions.length > 0){
                //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
                for(let i = 0; i < newFilteredTransactions.length; i++){ 
                    const value = newFilteredTransactions[i].value
                    newFilteredTransactions[i] = await provider.getTransactionReceipt(newFilteredTransactions[i].hash) 
                    newFilteredTransactions[i].timestamp = block.timestamp
                    newFilteredTransactions[i].value = parseFloat(ethers.utils.formatEther(value)).toFixed(3)
                    newFilteredTransactions[i].toAddressInfo = addresses.find(address =>
                        newFilteredTransactions[i].to ? address.address === newFilteredTransactions[i].to.toLowerCase() : null)
                        newFilteredTransactions[i].fromAddressInfo = addresses.find(address => 
                        address.address === newFilteredTransactions[i].from.toLowerCase())
                }
                console.log("Setting Filtered Transactions to ...")
                console.log(newFilteredTransactions)
            }else{console.log("No matching transactions in block " + block.number)} 
        //if there is a last block and there are mised blocks , add them to newFilteredTransactions
        }else{
            console.log("Blocks were skipped, filtering all skipped blocks and current block...")
            for(let blockNumToAdd = lastBlockNum+1; blockNumToAdd <= block.number; blockNumToAdd++){
                let blockToAdd = null
                let timestamp = null
                let blockToAddFilteredTransactions = null
                if(blockNumToAdd === block.mumber){
                    blockToAdd = block
                    timestamp = block.timestamp
                    blockToAddFilteredTransactions = block.transactions.filter(filter)
                }else{
                    blockToAdd = await provider.getBlockWithTransactions(blockNumToAdd)
                    timestamp = blockToAdd.timestamp
                    blockToAddFilteredTransactions = blockToAdd.transactions.filter(filter)
                }
                console.log("Filtering Block " + blockNumToAdd)
                console.log("Transactions found:")
                console.log(blockToAddFilteredTransactions)
                //add timestamp, update value, add associatedWatchListAddresses, and convert to receipt to get logs
                if(blockToAddFilteredTransactions.length > 0){
                    for(let i = 0; i < blockToAddFilteredTransactions.length; i++){ 
                        const value = blockToAddFilteredTransactions[i].value
                        blockToAddFilteredTransactions[i] = await provider.getTransactionReceipt(blockToAddFilteredTransactions[i].hash) 
                        console.log("DOOODOOOODOOOO", blockToAddFilteredTransactions[i])
                        blockToAddFilteredTransactions[i].timestamp = timestamp
                        blockToAddFilteredTransactions[i].value = parseFloat(ethers.utils.formatEther(value)).toFixed(3)
                        blockToAddFilteredTransactions[i].toAddressInfo = addresses.find(address =>
                            blockToAddFilteredTransactions[i].to ? address.address === blockToAddFilteredTransactions[i].to.toLowerCase() : null)
                        blockToAddFilteredTransactions[i].fromAddressInfo = addresses.find(address => 
                            address.address === blockToAddFilteredTransactions[i].from.toLowerCase())
                    }
                    console.log("Setting Filtered Transactions to ...")
                    newFilteredTransactions = newFilteredTransactions.concat(blockToAddFilteredTransactions)
                    console.log(newFilteredTransactions)
                }else{console.log("No matching transactions in block " + blockNumToAdd)} 
            }
        }
        //newFilteredTransactions = block.transactions.filter(filter)

        if(newFilteredTransactions.length > 0){
            console.log("Filtering done, setting filtered transactions.")
            setFilteredTransactions(newFilteredTransactions)
        }
        //copy of last block to track last black for use in feedtable detecting if txn is new
        if(lastBlockNum){setPrevBlockNum(lastBlockNum)}
        //set last block for forward for next iteration
        setLastBlockNum(block.number)
    }

    useEffect(() => {
      setLastBlockNum(null)
      //setPrevBlockNum(null)
    }, [isPaused])

    useEffect(() => {
        if (!account){setFeedTransactions([])}
    }, [account])
    

    useEffect(() => {
        //if fee is paused, or account block or addresses are null or lastBlockNum is still this block
        if(isPaused || !account || !block || !addresses || lastBlockNum === block.number){
            console.log("Not filtering transactions...")
            // setIsPaused(true)
            return
        }
        //check if any blocks were skipped
        filterTransactions()
    }, [block]) //addresses maybe account
    
    //called when filtered transactions is set, ensures feed is updated after
    useEffect(() => {
        console.log("Filtered transactions changed. Concatenating filtered transactions...")
        console.log("Setting Feed transactions to...")
        let newFeedTransactions = null
        //for initial load
        if(feedTransactions.length === 0){
            newFeedTransactions = filteredTransactions.reverse()
            console.log(newFeedTransactions)
        }else{
            newFeedTransactions = filteredTransactions.reverse().concat(feedTransactions)
            console.log(newFeedTransactions)
        }
        setFeedTransactions(newFeedTransactions)
    }, [filteredTransactions])

    return (
        <div id={FeedCSS.feed}>
            <WindowHeader window="Feed"/>
            <FeedTable account={account} isPaused={isPaused} setIsPaused={setIsPaused} feedTransactions={feedTransactions} setFeedTransactions={setFeedTransactions} currBlockNum={block ? block.number : null} prevBlockNum={prevBlockNum}/>
        </div>
    )
}

export default Feed
