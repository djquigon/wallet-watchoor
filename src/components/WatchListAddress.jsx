import React from 'react'
import {FaVolumeUp, FaVolumeMute, FaTrashAlt} from "react-icons/fa";
import WatchListCSS from "../style/WatchList.module.css"

const WatchListAddress = ({address, handleCheck, handleDelete}) => {
    return (
        /**Keys are required for react list addresses */
        <li className={WatchListCSS.address}>
            {/* <input type="checkbox" onChange={() => handleCheck(address.id)} alerts={address.alerts}></input> */}
            <a target="_blank" href={`https://etherscan.io/address/${address.address}`}> {address.alias} </a>
            <a target="_blank" href={`https://etherscan.io/address/${address.address}`}> {address.address} </a>
            <div className={WatchListCSS.addressOptions}>
                {address.alerts ? <FaVolumeUp color='#00ac31' role="button" onClick={() => handleCheck(address.id)}/> 
                : <FaVolumeMute color='red' role="button" onClick={() => handleCheck(address.id)}/>}
                <FaTrashAlt role="button" tabIndex="0" aria-label = {`Delete ${address.alias}`} onClick={() => handleDelete(address.id)}/>
            </div>
        </li>
    )
}

export default WatchListAddress
