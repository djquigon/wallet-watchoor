import React from 'react'
import {useState, useEffect} from 'react'
import "../style/WatchList.css"
import WatchListItem from './WatchListItem'
import WatchListAddItem from './WatchListAddItem'
import WatchListSearch from './WatchListSearch'
import apiRequest from '../apiRequest'

const WatchList = ({items, setItems}) => {
    const API_URL = "http://localhost:3500/items";
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    
    /**An empty array makes useEffect run at every reload, not every render */
    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch(API_URL)
                if(!response.ok) throw Error('Did not receive expected data')
                const listItems = await response.json();
                setItems(listItems)
                setFetchError(null)
            } catch (err) {
                setFetchError(err.message)
            } finally {
                setIsLoading(false);
            }
        }

        /**fetchItems returns no value, so you can simply call it, if it did return something you'd need to us an async instantly invoked function expression */
        /**simulate api response time */
        setTimeout(() => {
            fetchItems()
        }, 2000)
    }, [])

    const addWatchListItem = async (name, address) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1
        const myNewItem = {id, checked: false, name, address}
        const listItems = [...items, myNewItem]
        setItems(listItems)

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewItem) 
        }

        const result = await apiRequest(API_URL, postOptions)
        if(result) setFetchError(result)
    }

    const handleCheck = async (id) => {
        const listItems = items.map(item => item.id === id ? 
        /*Copy item but changed checked status to opposite*/
        {...item, checked: !item.checked} : item )
        setItems(listItems)

        const myItem = listItems.filter(item => item.id === id)
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions)
        if(result) setFetchError(result)
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems)

        const deleteOptions = {
            method: 'DELETE'
        }
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions)
        if(result) setFetchError(result)
    }

    const handleWatchListAdd = (e) => {
        e.preventDefault();
        if(!newItem){
            return
        }
        /**Need to adapt to add actual second field for addresses */
        addWatchListItem(newItem, "0xabd405")
        /**Sets the input text to empty */
        setNewItem("")
    }

    const filteredItems = items.filter(
        item => 
        ((item.name).toLowerCase()).includes(search.toLowerCase()) 
        || ((item.address).toLowerCase()).includes(search.toLowerCase())
    )

    return (
        <div id="watch-list">
            {isLoading && <p>Loading Items...</p>}
            {fetchError && <p> {`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading && <>
                <WatchListAddItem newItem={newItem} setNewItem={setNewItem} handleWatchListAdd={handleWatchListAdd}/>
                <WatchListSearch search={search} setSearch={setSearch}/>
                {filteredItems.length !== 0 ? (
                    <ul>
                        {filteredItems.map((item) => (
                            <WatchListItem key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete}/>
                        ))}
                    </ul>
                ) : 
                    (<p style={{marginTop: '2rem'}}>Your list is empty.</p>
                )}
                <p>{filteredItems.length} List Item(s)</p>
            </>}
        </div>
    )
}

export default WatchList