import React from 'react'
import TrollboxCSS from '../style/Trollbox.module.css'

const Trollbox = () => {
    return (
        <div id={TrollboxCSS.trollbox} style={{border: 'groove'}}>
            <p>Trollbox</p>
        </div>
    )
}

export default Trollbox
