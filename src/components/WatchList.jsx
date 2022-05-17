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

const provider = new ethers.providers.Web3Provider(window.ethereum)

const WatchList = ({account, addresses, setAddresses}) => {
    const API_URL = "http://localhost:8000/addresses?userAddress=" + account;
    const [newAddress, setNewAddress] = useState('');
    const [newAlias, setNewAlias] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const addWatchListAddress = async (addressInfo) => {
        const listAddresses = [...addresses, addressInfo]
        setAddresses(listAddresses)

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressInfo) 
        }

        const result = await apiRequest(API_URL, postOptions)
        if(result) setFetchError(result)
    }

    const handleChangeAlert = async (id) => {
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

    const getAddressInfo = async (address, ens) => {
        let resolver = null
        if(ens){ resolver = await provider.getResolver(ens) }
        const addressInfo ={
            id: addresses.length ? addresses[addresses.length - 1].id + 1 : 1,
            userAddress: account, 
            alerts: true, 
            //first three are default
            alias: newAlias,
            address: address.toLowerCase(),
            ens: ens,
            avatar: resolver ? await resolver.getAvatar() : null,
            twitterName: resolver ? await resolver.getText("com.twitter") : null,
            telegramName: resolver ? await resolver.getText("org.telegram") : null,
            email: resolver ? await resolver.getText("email") : null,
            website: resolver ? await resolver.getText("url") : null,
            location: resolver ? await resolver.getText("location") : null,
        }
        //if address avatar is not null get the url
        if(addressInfo.avatar){ addressInfo.avatar = addressInfo.avatar.url }
        if(addressInfo.website && !addressInfo.website.includes("https://")){ addressInfo.website = `https://${addressInfo.website}`}

        return addressInfo
    }

    const handleWatchListAdd = async (e) => {
        e.preventDefault();
        if(!newAddress){
            return
        }
        /**If the address to add is a valid eth address */
        if (ethers.utils.isAddress(newAddress)){
            const ens = await provider.lookupAddress(newAddress)
            const addressInfo = await getAddressInfo(newAddress, ens)
            addWatchListAddress(addressInfo)
        // if the address to add is a valid ens
        } else if(await provider.resolveName(newAddress)) {
            const address = await provider.resolveName(newAddress)
            const addressInfo = await getAddressInfo(address, newAddress)
            addWatchListAddress(addressInfo)
        }else{ 
            window.alert("Not a valid address. Please ensure the address you entered exists. Check the following link: https://etherscan.io/address/" + newAddress)
            return
        }
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
                // console.log(listAddresses)
                // console.log(addresses)
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
        // fetchAddresses()
    }, [account]) /**Account as a depedency, ensures account is not null when addresses are fetched */

    return (
        <div id={WatchListCSS.watchList}>
            <WindowHeader window="Watchoor List"/>
            {isLoading && <AiOutlineLoading className="loadingSvg"/>}
            {fetchError && <p> {`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading && <>
                <WatchListAddAddress newAddress={newAddress} setNewAddress={setNewAddress} newAlias={newAlias} setNewAlias={setNewAlias} handleWatchListAdd={handleWatchListAdd}/>
                <WatchListSearch search={search} setSearch={setSearch}/>
                {filteredAddresses.length > 0 ? (
                    <ol>
                        {filteredAddresses.map((address) => (
                            <WatchListAddress key={address.id} address={address} handleChangeAlert={handleChangeAlert} handleDelete={handleDelete}/>
                        ))}
                    </ol>
                ) : (!account ? <p style={{marginTop: '2rem'}}>Your wallet is not connected.</p> 
                    : <p style={{marginTop: '2rem'}}>Your list is empty.</p>)
                }
                <p id={WatchListCSS.watchlistLength}>{filteredAddresses.length} Address(es)</p>
            </>}
        </div>
    )
}

export default WatchList