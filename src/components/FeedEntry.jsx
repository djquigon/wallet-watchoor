import React from 'react'
import FeedCSS from '../style/Feed.module.css'
import {FaTrashAlt, FaExternalLinkAlt} from "react-icons/fa";

const FeedEntry = () => {
    return (
        <tr className={FeedCSS.feedRow}>
            <td>Bob (0x090132...)</td>
            <td>Sally (0xas42t2...)</td>
            <td>Atomic Match_</td>
            <td>40 Ξ</td>
            <td>2021-12-30 04:45</td>
            <td><a href="#">0x82sas7... <FaExternalLinkAlt/></a></td>
            <td><FaTrashAlt/></td>
        </tr>
    )
}

export default FeedEntry
