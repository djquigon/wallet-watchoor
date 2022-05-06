import React from 'react'
import WindowHeaderCSS from "../style/WindowHeader.module.css"
import {FaWindowClose} from "react-icons/fa";
import {GoMute, GoUnmute} from "react-icons/go";

const WindowHeader = ({window}) => {
    const closeWindow = () => {

    }

    return (
        <div id = {WindowHeaderCSS.windowHeader}>
            <p>{window}</p>
            { window != 'Feed' 
            ? <button onClick={closeWindow}><FaWindowClose color='black'/></button> 
            : <button><GoUnmute/></button>
            }
        </div>
    )
}

export default WindowHeader
