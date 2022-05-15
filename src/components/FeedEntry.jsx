import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import '../style/FeedEntry.css'
import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";
import makeBlockie from 'ethereum-blockies-base64';


const FeedEntry = ({transaction}) => {
    const fromInfo = transaction.fromAddressInfo !== undefined ? {alias: transaction.fromAddressInfo.alias, avatar: transaction.fromAddressInfo.avatar} : null
    const toInfo = transaction.toAddressInfo !== undefined ? {alias: transaction.toAddressInfo.alias, avatar: transaction.toAddressInfo.avatar} : null
    return (
        <tr className={FeedCSS.feedRow}>
            <td>
                <a target="_blank" href={`https://etherscan.io/address/${transaction.from}`}>
                    {/* can take this out if i dont allow alias to be null */}
                    {fromInfo && fromInfo.alias ? ` ⭐ ${fromInfo.alias}` : ""}
                    {fromInfo && fromInfo.avatar ? <img className={FeedCSS.avatar} src={fromInfo.avatar}></img> : <img className={FeedCSS.avatar} src={makeBlockie(transaction.from)}></img>}
                    {` ${transaction.from.toString().substring(0, 6)}...${transaction.from.toString().substring(transaction.from.length - 4)}`} <FaExternalLinkAlt/>
                </a>
            </td>
            <td>
                {!transaction.to ? <p>Contract Creation</p> : 
                    <a target="_blank" href={`https://etherscan.io/address/${transaction.to}`}>
                        {toInfo && toInfo.avatar ? <img className={FeedCSS.avatar} src={toInfo.avatar}></img> : <img className={FeedCSS.avatar} src={makeBlockie(transaction.to)}></img>}
                        {toInfo && toInfo.alias ? ` ⭐${toInfo.alias}` : ""}
                        {` ${transaction.to.toString().substring(0, 6)}...${transaction.to.toString().substring(transaction.to.length - 4)}`} <FaExternalLinkAlt/>
                    </a>
                }
            </td>
            <td>Atomic Match_</td>
            <td className={
                `${transaction.value >= 1 && transaction.value <= 10 ? "smallValue" : ""}${transaction.value >= 10 && transaction.value <= 50 ? "mediumValue" : ""}${transaction.value >= 50 && transaction.value <= 100 ? "largeValue" : ""}${transaction.value >= 100 && transaction.value <= 500 ? "largeValue" : ""}${transaction.value >= 500 && transaction.value <= 1000 ? "largeValue" : ""}`}>
                <b>{transaction.value} Ξ</b>
            </td>
            <td>{new Date(transaction.timestamp*1000).toLocaleTimeString("en-US")} EST</td>
            <td className={`${transaction.creates ? "contractCreation" : ""}`}>
                <a target="_blank" href={`https://etherscan.io/tx/${transaction.hash}`}>
                    {`${transaction.hash.toString().substring(0, 6)}...${transaction.hash.toString().substring(transaction.hash.length - 4)}`} <FaExternalLinkAlt/>
                </a>
            </td>
            <td><FaTrashAlt/></td>
        </tr>
    )
}

export default FeedEntry
