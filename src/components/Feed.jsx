import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import FeedEntry from './FeedEntry';


import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";

const Feed = ({account, addresses}) => {
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
                        <FeedEntry/>
                        <FeedEntry/>
                        <tr className={FeedCSS.feedRow}>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td>Atomic Match_</td>
                            <td id={FeedCSS.monkee} style={{color: "#13ff00"}}><b>40 Ξ</b></td>
                            <td>2021-12-30 04:45</td>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td><FaTrashAlt/></td>
                        </tr>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <tr className={FeedCSS.feedRow}>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td>Atomic Match_</td>
                            <td id={FeedCSS.dave} style={{color: "#13ff00"}}><b>40 Ξ</b></td>
                            <td>2021-12-30 04:45</td>
                            <td><a href="#">0x82sa...4d2z <FaExternalLinkAlt/></a></td>
                            <td><FaTrashAlt/></td>
                        </tr>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                        <FeedEntry/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Feed
