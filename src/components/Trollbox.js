import React from 'react'
import TrollboxCSS from '../style/Trollbox.module.css'

const Trollbox = () => {
    return (
        <div id={TrollboxCSS.trollbox}>
            <div id={TrollboxCSS.trollboxHeader}><p>Trollbox</p></div>
        </div>
    )
}

export default Trollbox
