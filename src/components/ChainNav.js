import React from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'

const ChainNav = () => {
    return (
        <nav id={ChainNavCSS.chainNav}>
            <div>
                <button>Ethereum</button>
                <button>BSC</button>
                <button>Avalanche</button>
                <button>Polygon</button>
                <button>Fantom</button>
                <button>Harmony</button>
                <button>Arbitrum</button>
                <button>Optimism</button>
            </div>
            <button id={ChainNavCSS.disconnectBtn}>0x1c63...9B40</button>
        </nav>
    )
}

export default ChainNav
