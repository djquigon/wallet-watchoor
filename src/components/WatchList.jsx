import React from 'react'
import {useState, useEffect} from 'react'
import WindowHeader from './WindowHeader'
import WatchListCSS from "../style/WatchList.module.css"
import WatchListAddress from './WatchListAddress'
import WatchListAddAddress from './WatchListAddAddress'
import WatchListSearch from './WatchListSearch'
import apiRequest from '../apiRequest'
import { ethers } from 'ethers'
import {AiOutlineLoading} from "react-icons/ai"

const WatchList = ({account, addresses, setAddresses}) => {
    const API_URL = "http://localhost:8000/addresses?userAddress=" + account;
    const [newAddress, setNewAddress] = useState('');
    const [newAlias, setNewAlias] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const addWatchListAddress = async (alias, address) => {
        const id = addresses.length ? addresses[addresses.length - 1].id + 1 : 1
        const myNewAddress = {id, alerts: true, alias, address, userAddress: account}
        const listAddresses = [...addresses, myNewAddress]
        setAddresses(listAddresses)

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewAddress) 
        }

        const result = await apiRequest(API_URL, postOptions)
        if(result) setFetchError(result)
    }

    const handleCheck = async (id) => {
        const listAddresses = addresses.map(address => address.id === id ? 
        /*Copy address but changed alerts status to opposite*/
        {...address, alerts: !address.alerts} : address )
        setAddresses(listAddresses)

        const myAddress = listAddresses.filter(address => address.id === id)
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({alerts: myAddress[0].alerts})
        }
        const reqUrl =  'http://localhost:8000/addresses/' + id;
        // const reqUrl = `${API_URL}&id=${id}`;
        const result = await apiRequest(reqUrl, updateOptions)
        if(result) setFetchError(result)
    }

    const handleDelete = async (id) => {
        const listAddresses = addresses.filter((address) => address.id !== id);
        setAddresses(listAddresses)

        const deleteOptions = {
            method: 'DELETE'
        }
        const reqUrl =  'http://localhost:8000/addresses/' + id;
        const result = await apiRequest(reqUrl, deleteOptions)
        if(result) setFetchError(result)
    }

    const handleWatchListAdd = (e) => {
        e.preventDefault();
        if(!newAddress){
            return
        }
        /**Need to adapt to add actual second field for addresses */
        if (ethers.utils.isAddress(newAddress)){
            addWatchListAddress(newAlias, newAddress.toLowerCase())
        } else{ window.alert("Not a valid address. Please ensure the address you entered exists. Check the following link: https://etherscan.io/address/" + newAddress)}
        /**Sets the input text to empty */
        setNewAddress("")
        setNewAlias("")
    }

    const filteredAddresses = addresses.filter(
        address => 
        ((address.alias).toLowerCase()).includes(search.toLowerCase()) 
        || ((address.address).toLowerCase()).includes(search.toLowerCase())
    )

    /**An empty array makes useEffect run at every reload, not every render */
    useEffect(() => {
        const fetchAddresses = async () => {
            try{
                const response = await fetch(API_URL)
                if(!response.ok) throw Error('Did not receive expected data')
                const listAddresses = await response.json();
                setAddresses(listAddresses)
                setFetchError(null)
            } catch (err) {
                setFetchError(err.message)
            } finally {
                setIsLoading(false);
            }
        }

        /**fetchAddresses returns no value, so you can simply call it, if it did return something you'd need to us an async instantly invoked function expression */
        /**simulate api response time */
        setTimeout(() => {
            fetchAddresses()
        }, 5000)
    }, [account]) /**Account as a depedency, ensures account is not null when addresses are fetched */

    return (
        <div id={WatchListCSS.watchList}>
            <WindowHeader window="Watchoor List"/>
            {isLoading && <p>Loading Addresses...</p>}
            {fetchError && <p> {`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading && <>
                <WatchListAddAddress newAddress={newAddress} setNewAddress={setNewAddress} newAlias={newAlias} setNewAlias={setNewAlias} handleWatchListAdd={handleWatchListAdd}/>
                <WatchListSearch search={search} setSearch={setSearch}/>
                {filteredAddresses.length !== 0 ? (
                    <ol>
                        {filteredAddresses.map((address) => (
                            <WatchListAddress key={address.id} address={address} handleCheck={handleCheck} handleDelete={handleDelete}/>
                        ))}
                    </ol>
                ) : (!account ? <p style={{marginTop: '2rem'}}>Your wallet is not connected.</p> 
                    : <p style={{marginTop: '2rem'}}>Your list is empty.</p>)
                }
                <p>{filteredAddresses.length} Address(es)</p>
            </>}
        </div>
    )
}

export default WatchList