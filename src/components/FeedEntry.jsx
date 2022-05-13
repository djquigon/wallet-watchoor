import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import '../style/FeedEntry.css'
import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";
import { ethers } from 'ethers';

const FeedEntry = ({transaction}) => {
    return (
        <tr className={FeedCSS.feedRow}>
            <td>
                <a target="_blank" href={`https://etherscan.io/address/${transaction.from}`}>
                    {`${transaction.from.toString().substring(0, 6)}...${transaction.from.toString().substring(transaction.from.length - 4)}`} <FaExternalLinkAlt/>
                </a>
            </td>
            <td>
                <a target="_blank" href={`https://etherscan.io/address/${transaction.to}`}>
                    {`${transaction.to.toString().substring(0, 6)}...${transaction.to.toString().substring(transaction.to.length - 4)}`} <FaExternalLinkAlt/>
                </a>
            </td>
            <td>Atomic Match_</td>
            <td className={
                `${transaction.value >= 1 && transaction.value <= 10 ? "smallValue" : ""}${transaction.value >= 10 && transaction.value <= 50 ? "mediumValue" : ""}${transaction.value >= 50 && transaction.value <= 100 ? "largeValue" : ""}${transaction.value >= 100 && transaction.value <= 500 ? "largeValue" : ""}${transaction.value >= 500 && transaction.value <= 1000 ? "largeValue" : ""}`}>
                <b>{transaction.value} Ξ</b>
            </td>
            <td>{new Date(transaction.timestamp*1000).toLocaleTimeString("en-US")} EST</td>
            <td>
                <a target="_blank" href={`https://etherscan.io/tx/${transaction.hash}`}>
                    {`${transaction.hash.toString().substring(0, 6)}...${transaction.hash.toString().substring(transaction.hash.length - 4)}`} <FaExternalLinkAlt/>
                </a>
            </td>
            <td><FaTrashAlt/></td>
        </tr>
    )
}

export default FeedEntry
