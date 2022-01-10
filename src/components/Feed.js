import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import WindowHeader from './WindowHeader'
import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";

const Feed = () => {
    return (
        <div id={FeedCSS.feed}>
            <WindowHeader window="Feed"/>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Method</th>
                        <th>Value</th>
                        <th>Timestamp</th>
                        <th>Txh Hash</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bob (0x090132...)</td>
                        <td>Sally (0xas42t2...)</td>
                        <td>Atomic Match_</td>
                        <td>40 Ξ</td>
                        <td>2021-12-30 04:45</td>
                        <td>0x82sas7...<a href="#"><FaExternalLinkAlt/></a></td>
                        <FaTrashAlt/>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Feed
