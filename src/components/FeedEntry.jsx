import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import '../style/FeedEntry.css'
import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";
import makeBlockie from 'ethereum-blockies-base64';
import etherscanLogo from "../assets/etherscanlogo.png"


const FeedEntry = ({transaction, handleDelete}) => {
    const fromInfo = transaction.fromAddressInfo !== undefined ? {alias: transaction.fromAddressInfo.alias, avatar: transaction.fromAddressInfo.avatar} : null
    const toInfo = transaction.toAddressInfo !== undefined ? {alias: transaction.toAddressInfo.alias, avatar: transaction.toAddressInfo.avatar} : null
    return (
        <tr className={FeedCSS.feedRow}>
            <td>
                <>
                    {/* can take this out if i dont allow alias to be null */}
                    {fromInfo && fromInfo.avatar ? <img className={FeedCSS.avatar} src={fromInfo.avatar}></img> : <img className={FeedCSS.avatar} src={makeBlockie(transaction.from)}></img>}
                    {fromInfo && fromInfo.alias ? ` ⭐${fromInfo.alias} ` : " "}
                    <br></br><a target="_blank" href={`https://etherscan.io/address/${transaction.from}`}>{`${transaction.from.substring(0, 6)}...${transaction.from.substring(transaction.from.length - 4)}`} <img height="14px" src={etherscanLogo}></img></a>
                </>
            </td>
            <td>
                {!transaction.to ? <b style={{color: "gold"}}>Contract Creation</b> : 
                    <>
                        {toInfo && toInfo.avatar ? <img className={FeedCSS.avatar} src={toInfo.avatar}></img> : <img className={FeedCSS.avatar} src={makeBlockie(transaction.to)}></img>}
                        {toInfo && toInfo.alias ? ` ⭐${toInfo.alias} ` : " "}
                        <br></br><a target="_blank" href={`https://etherscan.io/address/${transaction.to}`}>{`${transaction.to.substring(0, 6)}...${transaction.to.substring(transaction.to.length - 4)}`} <img height="14px" src={etherscanLogo}></img></a>
                    </>
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
                    {`${transaction.hash.substring(0, 6)}...${transaction.hash.substring(transaction.hash.length - 4)}`} <img height="14px" src={etherscanLogo}></img>
                </a>
            </td>
            <td style={{textAlign: "right"}}><FaTrashAlt role="button" onClick={() => handleDelete(transaction.hash)}/></td>
        </tr>
    )
}

export default FeedEntry
