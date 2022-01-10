import React from 'react'
import WindowHeaderCSS from "../style/WindowHeader.module.css"
import {FaWindowClose} from "react-icons/fa";

const WindowHeader = ({window}) => {
    const closeWindow = () => {

    }

    return (
        <div id = {WindowHeaderCSS.windowHeader}>
            <p>{window}</p>
            { window != 'Feed' && <button onClick={closeWindow}><FaWindowClose/></button> }
        </div>
    )
}

export default WindowHeader
