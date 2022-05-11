import React, { useEffect, useState } from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'
import WalletConnector from './WalletConnector'
import {FaExternalLinkAlt} from "react-icons/fa";
import {AiOutlineLoading} from "react-icons/ai"
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum)

const ChainNav = ({account, handleAccount}) => {

    // const [chain, setChain] = useState("ethereum")
    const [block, setBlock] = useState(null)

    const getBlock = async () => {
        console.log("getBlock")
        // window.ethereum.request({ method: "eth_getBlockByNumber", params: ['latest', false] })
        // .then(blockInfo => {
        //     setBlock(blockInfo)
        // })
        const blockInfo = await provider.getBlock()
        setBlock(blockInfo)
    }

    const convertBlockAge = (timestamp) => {
        const time = new Date(timestamp*1000).toLocaleTimeString("en-US")
        return time
    }

    const getBurntFees = () =>{
        const baseFeePerGas = ethers.utils.formatEther(parseInt(block.baseFeePerGas._hex, 16))
        const gasUsed = parseInt(block.gasUsed._hex, 16)
        return baseFeePerGas * gasUsed
    }


    useEffect(() => {
        //call for initial load
        getBlock()
        //set loading somewhere and have conditionals for elements
        const blockUpdater = setInterval(getBlock, 15000)
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
                    <p>🟢&nbsp;
                        <em style={{color: '#008f00'}}>
                            Block # {block ? block.number : <AiOutlineLoading className="loadingSvg"/>}
                        </em>
                    </p>
                    <p>
                        {block ? block.transactions.length : <AiOutlineLoading className="loadingSvg"/>} txn(s)
                    </p>
                    <p>
                        <em style={{color: '#ff1500'}}>{block ? parseInt(block.gasUsed._hex, 16).toLocaleString('en-US') : <AiOutlineLoading className="loadingSvg"/>} </em>
                         gas used ⛽
                    </p>
                    <p>
                        <em style={{color: '#ff1500'}}>{block ? getBurntFees().toFixed(3) : <AiOutlineLoading className="loadingSvg"/>} Ξ </em>
                         in fees burnt 🔥
                    </p>
                    <a target="_blank" href={block && `https://etherscan.io/block/${block.number}`}>
                        Block created {block ? convertBlockAge(block.timestamp) : <AiOutlineLoading className="loadingSvg"/>} EST <FaExternalLinkAlt/>
                    </a>
                </div>
            </div>
            <WalletConnector account={account} handleAccount={handleAccount}/>
        </nav>
    )
}

export default ChainNav