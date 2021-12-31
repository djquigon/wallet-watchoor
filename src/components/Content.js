import React from 'react'
import {useState} from 'react'
import "../style/Content.css"
import WatchList from './WatchList'

const Content = () => {
    /*Need the watchlist state variable in content for use in feed*/
    const [items, setItems] = useState([]);

    return (
        <main>
            <button id="connect-btn">Connect Wallet</button>
            {/**Length is unecessary here, but demonstrates custom props, imagine you passed this into footer by itself as a prop */}
            <WatchList items={items} setItems={setItems}/>
        </main>
    )
}

export default Content
