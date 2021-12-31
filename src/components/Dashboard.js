import React from 'react'
import {useState} from 'react'
import "../style/Dashboard.css"
import ChainNav from './ChainNav'
import Feed from './Feed'
import WatchList from './WatchList'
import Trollbox from './Trollbox'
import Dosbox from './Dosbox'

const Dashboard = () => {
    /*Need the watchlist state variable in dashboard for use in feed*/
    const [addresses, setAddresses] = useState([]);

    return (
        <main>
            <button id="connect-btn">Connect Wallet</button>
            <div id="dashboard-container">
                <ChainNav/>
                <Feed/>
                <WatchList addresses={addresses} setAddresses={setAddresses}/>
                <Trollbox/>
                <Dosbox/>
            </div>
        </main>
    )
}

export default Dashboard
