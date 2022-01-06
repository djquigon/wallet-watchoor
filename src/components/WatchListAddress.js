import React from 'react'
import {FaTrashAlt} from "react-icons/fa";
import WatchListCSS from "../style/WatchList.module.css"

const WatchListAddress = ({address, handleCheck, handleDelete}) => {
    return (
        /**Keys are required for react list addresses */
        <li className='address'>
            <input type="checkbox" onChange={() => handleCheck(address.id)} checked={address.checked}></input>
            <label>
                <a target="_blank" href={`https://etherscan.io/address/${address.address}`}> {address.alias}//{address.address}</a>
            </label>
            <FaTrashAlt role="button" tabIndex="0" aria-label = {`Delete ${address.alias}`} onClick={() => handleDelete(address.id)}/>
        </li>
    )
}

export default WatchListAddress
