import React from 'react'
import {FaTrashAlt} from "react-icons/fa";

const WatchListItem = ({item, handleCheck, handleDelete}) => {
    return (
        /**Keys are required for react list items */
        <li className='item'>
            <input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked}></input>
            <label style={item.checked ? { textDecoration: 'line-through'
            } : null }>{`Alias: {${item.name}} Address: {${item.address}}`}</label>
            <FaTrashAlt role="button" tabIndex="0" aria-label = {`Delete ${item.name}`} onClick={() => handleDelete(item.id)}/>
        </li>
    )
}

export default WatchListItem
