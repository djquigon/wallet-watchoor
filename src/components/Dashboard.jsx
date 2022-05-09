import React from 'react'
import {useState} from 'react'
import DashboardCSS from "../style/Dashboard.module.css"
import ChainNav from './ChainNav'
import Feed from './Feed'
import WatchList from './WatchList'
import Trollbox from './Trollbox'
import Dosbox from './Dosbox'
import WalletConnector from './WalletConnector';


const Dashboard = ({account, handleAccount}) => {
    /*Need the watchlist state variable in dashboard for use in feed,**** or maybe not?*/
    const [addresses, setAddresses] = useState([]);

    return (
        <main>
            <div id={DashboardCSS.dashboardContainer}>
                <ChainNav account={account} handleAccount={handleAccount}/>
                <Feed account={account} addresses={addresses}/>
                <WatchList account={account} addresses={addresses} setAddresses={setAddresses}/>
                <Trollbox/>
                <Dosbox/>
            </div>
        </main>
    )
}

export default Dashboard
