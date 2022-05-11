import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import HomeCSS from "../style/Home.module.css"
import {ImFeed, ImList2} from "react-icons/im";
import {GrDos} from "react-icons/gr";
import {IoMdChatboxes} from "react-icons/io";
import WalletConnector from './WalletConnector';

const Home = ({account, handleAccount}) => {
    return (
        <main>
            <header id={HomeCSS.header}>
                <div id={HomeCSS.headerConnectBtn}>
                    <WalletConnector account={account} handleAccount={handleAccount}/>
                </div>
                <div id={HomeCSS.headerContent}>
                    <h1>Welcome Watchoooors</h1>
                    <h3>Tired of getting dumped on unknowingly by your favorite influencers?
                        Need a way to get ahead of the curve? 
                        Well you've come to the right place.
                    </h3>
                    <div id={HomeCSS.landingBtns}>
                        <Link to="app"><button>Enter App</button></Link>
                        <a target="_blank" href="https://discord.gg/Phh6A2nW"><button>Join the Community</button></a>
                    </div>
                </div>
            </header>
            <h1 className={HomeCSS.landingText}>🕵️‍♂️ Never get caught lacking again. 🕵️‍♀️</h1>
            <div id={HomeCSS.featuresRow}>
                <div className={HomeCSS.feature}>
                    <div className={HomeCSS.featureImg}>
                        <ImList2/>
                    </div>
                    <Link to="app"><h1>WatchList</h1></Link>
                    <h3>Currate what you want to see.</h3><p>Add addresses you want to watch to see their activity on your feed.</p>
                </div>
                <div className={HomeCSS.feature}>
                    <div className={HomeCSS.featureImg}>
                        <ImFeed/>
                    </div>
                    <Link to="app"><h1>Feed</h1></Link>
                    <h3>Keep an eye out.</h3><p>Track transactions from addresses on your wacthlist and get instant notifications.</p>
                </div>
                <div className={HomeCSS.feature}>
                    <div className={HomeCSS.featureImg}>
                        <IoMdChatboxes/>
                    </div>
                    <Link to="app"><h1>Trollbox</h1></Link>
                    <h3>Spread the word.</h3><p>Talk to other watchoors and keep each other posted with memes and information.</p>
                </div>
                <div className={HomeCSS.feature}>
                    <div className={HomeCSS.featureImg}>
                        <GrDos/>
                    </div>
                    <Link to="app"><h1>Dosbox</h1></Link>
                    <h3>Tired of watchooring?</h3><p>Take a break and play some classic Dos games in the meantime.</p>
                </div>
            </div>
            <h3 className={HomeCSS.landingText}>
                Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                Need something to keep you busy while you wait for alerts? Have fun trying old-school games in the Dosbox.
            </h3>
            <iframe src="https://www.youtube.com/embed/61Q6wWu5ziY" title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <h3 className={HomeCSS.landingText}>
                Head to the learn more tab if you have any other questions.
            </h3>  
        </main>
    )
}

export default Home