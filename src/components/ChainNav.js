import React from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'
import WalletConnector from './WalletConnector'
import {FaExternalLinkAlt} from "react-icons/fa";

const ChainNav = () => {
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
                    <p>🟢 <em style={{color: '#008f00'}}>12246459</em></p>
                    <p>232 txn(s)</p>
                    <p><em style={{color: '#ff5500'}}>0.592 Ξ</em> in fees burnt 🔥</p>
                    <a>Block created 22 secs ago <FaExternalLinkAlt/></a>
                </div>
            </div>
            <WalletConnector/>
        </nav>
    )
}

export default ChainNav
