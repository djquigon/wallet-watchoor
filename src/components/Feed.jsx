import {useEffect, useState} from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import FeedEntry from './FeedEntry';
import { ethers } from 'ethers';

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
        let blocksMissed = block.number-(lastBlockNumFetched+1)
        console.log("Blocks missed: " + blocksMissed)
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
                //change value field to actual number
                //newFilteredTransactions = newFilteredTransactions.map(transaction => ({...transaction, value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3)}))
                console.log("Setting Filtered Transactions to ...")
                console.log(newFilteredTransactions)
            }else{console.log("No matching transactions in block " + block.number)} 
        //if there is a last block and there are mised blocks , add them to newFilteredTransactions
        }else{
            console.log("Blocks were skipped, filtering all skipped blocks...")
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
                    //change value field to actual number
                    //newFilteredTransactions = newFilteredTransactions.map(transaction => ({...transaction, value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3)}))
                    console.log("Setting Filtered Transactions to ...")
                    newFilteredTransactions = newFilteredTransactions.concat(blockToAddFilteredTransactions)
                    console.log(newFilteredTransactions)
                }else{console.log("No matching transactions in block " + blockNumToAdd)} 
            }
        }
        //newFilteredTransactions = block.transactions.filter(filter)
        console.log("Filtering done, setting filtered transactions.")
        setFilteredTransactions(newFilteredTransactions)
        setLastBlockNumFetched(block.number)
    }

    const handleDelete = (hash) => {
        const newFeedTransactions = feedTransactions.filter(transaction => transaction.hash !== hash)
        setFeedTransactions(newFeedTransactions)
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
        console.log(feedTransactions.concat(filteredTransactions))
        setFeedTransactions(feedTransactions.concat(filteredTransactions))
    }, [filteredTransactions])

    return (
        <div id={FeedCSS.feed}>
            <WindowHeader window="Feed"/>
            <div id={FeedCSS.tableContainer}>
                <table>
                    <thead>
                        <tr id={FeedCSS.headerRow}>
                            <th>From</th>
                            <th>To</th>
                            <th>Method</th>
                            <th>Value</th>
                            <th>Timestamp</th>
                            <th>Txn Hash</th>
                            <th>Total Txns: <b style={{color: "#00ca00"}}>{feedTransactions.length}</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* if there is not account display wallet not connected else display filtered transactions if length > 0 */}
                        {!account ? <tr style={{marginTop: '2rem'}}><td>Your wallet is not connected.</td></tr> :
                        ( 
                        feedTransactions.length > 0 ? (
                            feedTransactions.slice(0).reverse().map((transaction) => (
                                <FeedEntry key={transaction.hash} transaction={transaction} handleDelete={handleDelete}/>
                            ))
                        ) : <tr style={{marginTop: '2rem'}}><td>Your Feed is empty.</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Feed
