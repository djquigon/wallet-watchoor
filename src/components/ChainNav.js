import React from 'react'
import ChainNavCSS from '../style/ChainNav.module.css'

const ChainNav = () => {
    return (
        <div id={ChainNavCSS.chainNav}>
            <p>ChainNav</p>
            <button id={ChainNavCSS.disconnectBtn}>0x1c63...9B40</button>
        </div>
    )
}

export default ChainNav
