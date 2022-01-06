import React from 'react'
import {FaUserPlus} from 'react-icons/fa'
import WatchListCSS from "../style/WatchList.module.css"


const WatchListAddAddress = ({newAddress, setNewAddress, handleWatchListAdd}) => {
    return (
        <form className={WatchListCSS.addForm} onSubmit={(e) => handleWatchListAdd(e)}>
            <label htmlFor='addAddress'>Add Address</label>
            <input autoFocus id='addAddress' type='text' placeholder='Add Address' required
                value={newAddress} onChange={(e) => setNewAddress(e.target.value)}
            />
            {/**above exemplefies the concept of controlled components well, value always tied to state */}
            <button type='submit' aria-label='Add Address'>
                <FaUserPlus/>
            </button>
        </form>
    )
}

export default WatchListAddAddress
