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
    const [addresses, setAddresses] = useState([]);
    const [block, setBlock] = useState(null)

    return (
        <main>
            <div id={DashboardCSS.dashboardContainer}>
                <ChainNav block={block} setBlock={setBlock} account={account} handleAccount={handleAccount}/>
                <Feed block={block} account={account} addresses={addresses}/>
                <WatchList account={account} addresses={addresses} setAddresses={setAddresses}/>
                <Trollbox/>
                <Dosbox/>
            </div>
        </main>
    )
}

export default Dashboard
