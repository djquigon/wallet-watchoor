import {useEffect, useState} from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import FeedEntry from './FeedEntry';
import { ethers } from 'ethers';

import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";

const Feed = ({block, account, addresses}) => {

    const [filteredTransactions, setFilteredTransactions] = useState([])
    //add filterredTransactions to feedTransactions in useEffect?
    const [feedTransactions, setFeedTransactions] = useState([])
    const [lastBlockFetched, setLastBlockFetched] = useState(null)

    const filterTransactions = () => {
        
        const watchedAddresses = addresses.filter(address => address.alerts === true)
        .map(address => address.address)
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
        console.log("Last block " + lastBlockFetched)
        console.log("Filtering Block #...")
        console.log(block.number)
        let newFilteredTransactions = block.transactions.filter(filter)
        //add timestamp, update value, add associatedWatchListAddress
        if(newFilteredTransactions.length > 0){
            newFilteredTransactions = newFilteredTransactions.map(transaction => ({...transaction, 
                timestamp: block.timestamp, 
                value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3),
                //could be two addresses if both to and from are watched, filter them and then add field for whethere they are to or from
                toAddressInfo: addresses.find(address =>
                    transaction.to ? address.address === transaction.to.toLowerCase() : null),
                    // .map(address => ({...address,
                    //     isFrom: transaction.from.toLowerCase() === address.address,
                    //     isTo: transaction.to ? transaction.to.toLowerCase() === address.address : null
                    //     })
                    // )
                fromAddressInfo:  addresses.find(address => 
                    address.address === transaction.from.toLowerCase())
            }))
            //change value field to actual number
            //newFilteredTransactions = newFilteredTransactions.map(transaction => ({...transaction, value: parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(3)}))
            console.log("Setting Filtered Transactions to ...")
            console.log(newFilteredTransactions)
            setFilteredTransactions(newFilteredTransactions)
        }else{console.log("No matching transactions in block")} 
        setLastBlockFetched(block.number)
    }

    const refreshFeedTransactions = () => {
        if(filteredTransactions.length > 0){

        }
    }

    const handleDelete = (hash) => {
        const newFeedTransactions = feedTransactions.filter(transaction => transaction.hash !== hash)
        setFeedTransactions(newFeedTransactions)
    }

    //called when filtered transactions is set, ensures feed is updated after
    useEffect(() => {
        console.log("Filtered transactions changed. Concatenating filtered transactions...")
        console.log("Setting Feed transactions to...")
        console.log(feedTransactions.concat(filteredTransactions))
        setFeedTransactions(feedTransactions.concat(filteredTransactions))
    }, [filteredTransactions])

    useEffect(() => {
        //if account block or addresses are null or lastBlockFetched is still this block
        if(!account || !block || !addresses || lastBlockFetched === block.number){return}
        filterTransactions()
    }, [block, addresses]) //addresses maybe account
    


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
