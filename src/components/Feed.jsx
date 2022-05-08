import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import FeedEntry from './FeedEntry';

const Feed = () => {
    return (
        <div id={FeedCSS.feed}>
            <WindowHeader window="Feed"/>
            <div id={FeedCSS.tableContainer}>
                <table>
                    <thead>
                        <tr id={FeedCSS.headerRow}>
                            <th>From</th>
                            <th>To</th>
                            <th>Method</th>
                            <th>Value</th>
                            <th>Timestamp</th>
                            <th>Txn Hash</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <FeedEntry/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Feed
