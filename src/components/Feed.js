import React from 'react'
import FeedCSS from '../style/Feed.module.css'

const Feed = () => {
    return (
        <div id={FeedCSS.feed}>
            <div id={FeedCSS.feedHeader}><p>Feed</p></div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">The table header</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The table body</td>
                        <td>with two columns</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Feed
