import { useState } from "react";
import InfoCSS from "../style/Info.module.css";
import watchoor from "../assets/logo.gif";
import test from "../assets/test.png";

const Info = () => {
  const [displayFeed, setDisplayFeed] = useState(false);
  const [displayWatchlist, setDisplayWatchlist] = useState(false);
  const [displayTrollbox, setDisplayTrollbox] = useState(false);
  const [displayDosbox, setDisplayDosbox] = useState(false);

  return (
    <main>
      <div id={InfoCSS.container}>
        <div id={InfoCSS.handbookNavbar}>
          <div>
            <img width="16px" src={watchoor}></img> Wallet Watchoor Handbook
          </div>
          <ul className={InfoCSS.featureNav}>
            <li className={InfoCSS.featureList} onClick={() => {}}>
              Welcome
            </li>
            <li
              className={InfoCSS.featureList}
              onClick={() => {
                setDisplayWatchlist(!displayWatchlist);
              }}
            >
              Watchlist
              {displayWatchlist ? (
                <ul className={InfoCSS.sublist}>
                  <li>Adding an Address</li>
                  <li>Deleting an Address</li>
                  <li>Searching Addresses</li>
                  <li>Watchlist Address Data</li>
                </ul>
              ) : null}
            </li>
            <li
              className={InfoCSS.featureList}
              onClick={() => {
                setDisplayFeed(!displayFeed);
              }}
            >
              Feed
              {displayFeed ? (
                <ul className={InfoCSS.sublist}>
                  <li>Viewing Transactions</li>
                  <li>Deleting Transactions</li>
                  <li>Clearing Feed</li>
                  <li>Pausing/Starting Feed</li>
                  <li>Feed Pagination</li>
                  <li>Sorting and Searching</li>
                  <li>Feed Data</li>
                </ul>
              ) : null}
            </li>
            <li
              className={InfoCSS.featureList}
              onClick={() => {
                setDisplayTrollbox(!displayTrollbox);
              }}
            >
              Trollbox
              {displayTrollbox ? (
                <ul className={InfoCSS.sublist}>
                  <li>Chat with other Watchoors</li>
                  <li>Share Transactions and Addresses</li>
                </ul>
              ) : null}
            </li>
            <li
              className={InfoCSS.featureList}
              onClick={() => {
                setDisplayDosbox(!displayDosbox);
              }}
            >
              Dosbox
              {displayDosbox ? (
                <ul className={InfoCSS.sublist}>
                  <li>Take a Break</li>
                  <li>Have some fun</li>
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
        <div className={InfoCSS.handbookContent}>
          <img width="70%" height="70%" src={test}></img>
          <p>
            After adding addresses to your watchlist, wait for transactions to
            begin populating your feed.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Info;
