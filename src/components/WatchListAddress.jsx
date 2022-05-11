import React from 'react'
import {FaVolumeUp, FaVolumeMute, FaTrashAlt, FaTwitter, FaTelegram, FaGlobe} from "react-icons/fa";
import {RiMailSendFill} from "react-icons/ri"
import {MdLocationOn} from "react-icons/md"
import etherscanLogo from "../assets/etherscanlogo.png"
import WatchListCSS from "../style/WatchList.module.css"
import makeBlockie from 'ethereum-blockies-base64';

const WatchListAddress = ({address, handleCheck, handleDelete}) => {
    return (
        /**Keys are required for react list addresses */
        <li className={WatchListCSS.address}>
            <p>{address.avatar ? <img className={WatchListCSS.avatar} src={address.avatar}></img> : <img className={WatchListCSS.avatar} src={makeBlockie(address.address)}></img>}
            {address.ens ? ` ${address.alias} (${address.ens})` : ` ${address.alias}`}</p>
            <p>{address.address}</p>
            <div className={WatchListCSS.addressOptions}>
                {address.alerts ? <FaVolumeUp color='#00ac31' role="button" onClick={() => handleCheck(address.id)}/> 
                : <FaVolumeMute color='red' role="button" onClick={() => handleCheck(address.id)}/>}
                {address.twitterName && <a target="_blank" href={`https://twitter.com/${address.twitterName}`}><FaTwitter color='#1ea1f1'/></a>}
                {address.telegramName && <a target="_blank" href={`https://t.me/${address.telegramName}`}><FaTelegram color='#24a1dd'/></a>}
                {address.email && <a href={`mailto:${address.email}`}><RiMailSendFill color='#a040ff'/></a>}
                {address.website && <a href={address.website}><FaGlobe color='#dda624'/></a>}
                {address.location && <p><MdLocationOn color='#c36d2f'/> {` ${address.location}`}</p>}
                <a target="_blank" href={`https://etherscan.io/address/${address.address}`}><img src={etherscanLogo}></img></a>
                <FaTrashAlt role="button" tabIndex="0" aria-label = {`Delete ${address.alias}`} onClick={() => handleDelete(address.id)}/>
            </div>
        </li>
    )
}

export default WatchListAddress
