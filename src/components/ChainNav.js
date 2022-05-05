import React from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'
import WalletConnector from './WalletConnector'

const ChainNav = () => {
    return (
        <nav id={ChainNavCSS.chainNav}>
            <button className={ChainNavCSS.chainChangeBtn}>Ethereum</button>
            <button className={ChainNavCSS.chainChangeBtn}>BSC</button>
            <button className={ChainNavCSS.chainChangeBtn}>Avalanche</button>
            <button className={ChainNavCSS.chainChangeBtn}>Polygon</button>
            <button className={ChainNavCSS.chainChangeBtn}>Fantom</button>
            <button className={ChainNavCSS.chainChangeBtn}>Harmony</button>
            <button className={ChainNavCSS.chainChangeBtn}>Arbitrum</button>
            <button className={ChainNavCSS.chainChangeBtn}>Optimism</button>
            <WalletConnector/>
        </nav>
    )
}

export default ChainNav
