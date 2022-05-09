import React, { useEffect, useState } from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'
import WalletConnector from './WalletConnector'
import {FaExternalLinkAlt} from "react-icons/fa";
import { ethers } from 'ethers';

const ChainNav = ({account, handleAccount}) => {

    const [block, setBlock] = useState(null)

    const getBlock = () => {
        window.ethereum.request({ method: "eth_getBlockByNumber", params: ['latest', false] })
        .then(blockInfo => {
            setBlock(blockInfo)
        })
    }

    const convertBlockAge = (timestamp) => {
        const time = new Date(parseInt(timestamp, 16)*1000).toLocaleTimeString("en-US")
        return time
    }


    useEffect(() => {
        //set loading somewhere and have conditionals for elements
        const blockUpdater = setInterval(getBlock, 5000)
        /**cleanup */
        return () => { 
            clearInterval(blockUpdater)
        }
    }, [])

    return (
        <nav id={ChainNavCSS.chainNav}>
            <div id={ChainNavCSS.chainContainer}>
                    <button id = {ChainNavCSS.toggledChain} className={ChainNavCSS.chainChangeBtn}>Ethereum</button>
                    <button className={ChainNavCSS.chainChangeBtn}>BSC</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Avalanche</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Polygon</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Fantom</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Harmony</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Arbitrum</button>
                    <button className={ChainNavCSS.chainChangeBtn}>Optimism</button>
                <div id={ChainNavCSS.blockInfo}>
                    <p>🟢 
                        <em style={{color: '#008f00'}}>
                            {block && parseInt(block.number, 16)}
                        </em>
                    </p>
                    <p>
                        {block && parseInt(block.transactions.length, 16)} txn(s)
                    </p>
                    <p>
                        <em style={{color: '#ff1500'}}>{block && parseInt(block.gasUsed, 16).toLocaleString('en-US')} Ξ </em>
                         in gas used ⛽
                    </p>
                    <a target="_blank" href={block && `https://etherscan.io/block/${parseInt(block.number, 16)}`}>
                        Block created {block && convertBlockAge(block.timestamp)} EST <FaExternalLinkAlt/>
                    </a>
                </div>
            </div>
            <WalletConnector account={account} handleAccount={handleAccount}/>
        </nav>
    )
}

export default ChainNav
