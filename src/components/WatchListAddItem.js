import React from 'react'
import {FaUserPlus} from 'react-icons/fa'

const WatchListAddItem = ({newItem, setNewItem, handleWatchListAdd}) => {
    return (
        <form className='addForm' onSubmit={(e) => handleWatchListAdd(e)}>
            <label htmlFor='addItem'>Add Item</label>
            <input autoFocus id="addItem" type='text' placeholder='Add Address' required
                value={newItem} onChange={(e) => setNewItem(e.target.value)}
            />
            {/**above exemplefies the concept of controlled components well, value always tied to state */}
            <button type='submit' aria-label='Add Item'>
                <FaUserPlus/>
            </button>
        </form>
    )
}

export default WatchListAddItem
