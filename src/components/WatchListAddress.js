import React from 'react'
import {FaTrashAlt} from "react-icons/fa";

const WatchListAddress = ({address, handleCheck, handleDelete}) => {
    return (
        /**Keys are required for react list addresses */
        <li className='address'>
            <input type="checkbox" onChange={() => handleCheck(address.id)} checked={address.checked}></input>
            <label style={address.checked ? { textDecoration: 'line-through'
            } : null }>{`Alias: {${address.alias}} Address: {${address.address}}`}</label>
            <FaTrashAlt role="button" tabIndex="0" aria-label = {`Delete ${address.alias}`} onClick={() => handleDelete(address.id)}/>
        </li>
    )
}

export default WatchListAddress
