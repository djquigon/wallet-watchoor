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
    const [lastBlockNumFetched, setLastBlockNumFetched] = useState(null)

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
        console.log("Last block " + lastBlockNumFetched)
        console.log("Filtering Block " + block.number)
        let newFilteredTransactions = []
        //if there is no last block or missed blocks simply filter the current block
        if(!lastBlockNumFetched || lastBlockNumFetched + 1 === block.number){
            console.log("No blocks skipped, filtering current block...")
            newFilteredTransactions = block.transactions.filter(filter)
            if(newFilteredTransactions.length > 0){
                newFilteredTransactions = newFilteredTransactions.map(transaction => ({...transaction, 
                    timestamp: block.timestamp, 
                    value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3),
                    //could be two addresses if both to and from are watched, filter them and then add field for whethere they are to or from
                    toAddressInfo: addresses.find(address =>
                        transaction.to ? address.address === transaction.to.toLowerCase() : null),
                    fromAddressInfo:  addresses.find(address => 
                        address.address === transaction.from.toLowerCase())
                }))
                console.log("Setting Filtered Transactions to ...")
                console.log(newFilteredTransactions)
            }else{console.log("No matching transactions in block " + block.number)} 
        //if there is a last block and there are mised blocks , add them to newFilteredTransactions
        }else{
            console.log("Blocks were skipped, filtering all skipped blocks and current block...")
            for(let blockNumToAdd = lastBlockNumFetched+1; blockNumToAdd <= block.number; blockNumToAdd++){
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
                console.log("Filter Block # " + blockNumToAdd)
                console.log(blockToAdd)
                console.log(timestamp)
                console.log("Transactions found:")
                console.log(blockToAddFilteredTransactions)
                //add timestamp, update value, add associatedWatchListAddress
                if(blockToAddFilteredTransactions.length > 0){
                    blockToAddFilteredTransactions = blockToAddFilteredTransactions.map(transaction => ({...transaction, 
                        timestamp: timestamp, 
                        value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3),
                        //could be two addresses if both to and from are watched, filter them and then add field for whethere they are to or from
                        toAddressInfo: addresses.find(address =>
                            transaction.to ? address.address === transaction.to.toLowerCase() : null),
                        fromAddressInfo:  addresses.find(address => 
                            address.address === transaction.from.toLowerCase())
                    }))
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
        setLastBlockNumFetched(block.number)
    }

    useEffect(() => {
        //if account block or addresses are null or lastBlockNumFetched is still this block
        if(!account || !block || !addresses || lastBlockNumFetched === block.number){return}
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
            <FeedTable feedTransactions={feedTransactions} setFeedTransactions={setFeedTransactions}/>
        </div>
    )
}

export default Feed
