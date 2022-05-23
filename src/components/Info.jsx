import { useState } from "react";
import InfoCSS from "../style/Info.module.css";
import watchoor from "../assets/logo.gif";
import feedTxns from "../assets/info/feed_txns.png";
import welcome from "../assets/info/welcome.png";
import InfoSublistItem from "./InfoSublistItem";

const Info = () => {
  const [displayFeed, setDisplayFeed] = useState(false);
  const [displayWatchlist, setDisplayWatchlist] = useState(false);
  const [displayTrollbox, setDisplayTrollbox] = useState(false);
  const [displayDosbox, setDisplayDosbox] = useState(false);

  const [contentGif, setContentGif] = useState(welcome); //welcome
  const [contentText, setContentText] = useState("Welcome"); //welcome
  const [contentLabel, setContentLabel] = useState("Welcome"); //welcome

  return (
    <main>
      <div id={InfoCSS.container}>
        <div id={InfoCSS.handbookNavbar}>
          <div>
            <img width="16px" src={watchoor}></img> Wallet Watchoor Handbook
          </div>
          <hr></hr>
          <ul className={InfoCSS.featureNav}>
            <li
              className={InfoCSS.featureList}
              onClick={() => {
                setContentGif(welcome);
                setContentText("Welcome");
                setContentLabel("Welcome");
              }}
            >
              Welcome
            </li>
            <li className={InfoCSS.featureList}>
              <div
                onClick={() => {
                  setDisplayWatchlist(!displayWatchlist);
                }}
              >
                Watchlist
              </div>
              {displayWatchlist ? (
                <ul className={InfoCSS.sublist}>
                  <InfoSublistItem
                    contentLabel="Adding an Address"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Deleting an Address"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Searching Addresses"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Watchlist Address Data"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                </ul>
              ) : null}
            </li>
            <li className={InfoCSS.featureList}>
              <div
                onClick={() => {
                  setDisplayFeed(!displayFeed);
                }}
              >
                Feed
              </div>
              {displayFeed ? (
                <ul className={InfoCSS.sublist}>
                  <InfoSublistItem
                    contentLabel="Viewing Transactions"
                    contentGif={feedTxns}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Deleting Transactions"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Clearing Feed"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Pausing/Starting Feed"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Feed Pagination"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Sorting and Searching"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Feed Data"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                </ul>
              ) : null}
            </li>
            <li className={InfoCSS.featureList}>
              <div
                onClick={() => {
                  setDisplayTrollbox(!displayTrollbox);
                }}
              >
                Trollbox
              </div>
              {displayTrollbox ? (
                <ul className={InfoCSS.sublist}>
                  <InfoSublistItem
                    contentLabel="Chat with other Watchoors"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Share Transactions and Addresses"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                </ul>
              ) : null}
            </li>
            <li className={InfoCSS.featureList}>
              <div
                onClick={() => {
                  setDisplayDosbox(!displayDosbox);
                }}
              >
                Dosbox
              </div>
              {displayDosbox ? (
                <ul className={InfoCSS.sublist}>
                  <InfoSublistItem
                    contentLabel="Take a Break"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                  <InfoSublistItem
                    contentLabel="Have some fun"
                    contentGif={null}
                    contentText={"Test"}
                    setContentGif={setContentGif}
                    setContentText={setContentText}
                    setContentLabel={setContentLabel}
                  />
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
        <div className={InfoCSS.handbookContent}>
          <img width="70%" height="70%" src={contentGif}></img>
          <p>{contentText}</p>
          <b>{contentLabel}</b>
        </div>
      </div>
    </main>
  );
};

export default Info;
