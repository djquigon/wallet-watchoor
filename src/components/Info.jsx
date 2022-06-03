import { useContext, useState } from "react";
import InfoCSS from "../style/Info.module.css";
import watchoor from "../assets/logo.gif";
import InfoSublistItem from "./InfoSublistItem";
import Footer from "./Footer";
import INFO_CONSTANTS from "../InfoConstants";
import { ThemeContext } from "./Layout";
import light_info from "../assets/light_info.gif";
import dark_info from "../assets/dark_info.gif";

const Info = () => {
  const [displayIntroduction, setDisplayIntroduction] = useState(true);
  const [displayFeed, setDisplayFeed] = useState(false);
  const [displayWatchlist, setDisplayWatchlist] = useState(false);
  const [displayTrollbox, setDisplayTrollbox] = useState(false);
  const [displayDosbox, setDisplayDosbox] = useState(false);

  const [contentGif, setContentGif] = useState(INFO_CONSTANTS.WELCOME_GIF); //welcome
  const [contentText, setContentText] = useState(INFO_CONSTANTS.WELCOME_TEXT); //welcome
  const [contentLabel, setContentLabel] = useState("Welcome"); //welcome

  const theme = useContext(ThemeContext);
  return (
    <>
      <main>
        <div
          style={{
            background: `url(${
              theme.theme === "light" ? light_info : dark_info
            })`,
          }}
          id={InfoCSS.container}
        >
          <div id={InfoCSS.handbookNavbar}>
            <div>
              <img width="16px" src={watchoor}></img> Wallet Watchoor Handbook
            </div>
            <hr></hr>
            <ul className={InfoCSS.featureNav}>
              <li className={InfoCSS.featureList}>
                <div
                  onClick={() => {
                    setDisplayIntroduction(!displayIntroduction);
                  }}
                >
                  Introduction
                </div>
                {displayIntroduction ? (
                  <ul className={InfoCSS.sublist}>
                    <InfoSublistItem
                      contentLabel="Welcome"
                      contentGif={INFO_CONSTANTS.WELCOME_GIF}
                      contentText={INFO_CONSTANTS.WELCOME_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Dashboard Basics"
                      contentGif={INFO_CONSTANTS.DASHBOARD_BASICS_GIF}
                      contentText={INFO_CONSTANTS.DASHBOARD_BASICS_TEXT}
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
                    setDisplayWatchlist(!displayWatchlist);
                  }}
                >
                  Watchlist
                </div>
                {displayWatchlist ? (
                  <ul className={InfoCSS.sublist}>
                    <InfoSublistItem
                      contentLabel="Adding an Address"
                      contentGif={INFO_CONSTANTS.ADDING_ADDRESS_GIF}
                      contentText={INFO_CONSTANTS.ADDING_ADDRESS_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Deleting or Muting Addresses"
                      contentGif={INFO_CONSTANTS.DELETING_ADDRESS_GIF}
                      contentText={INFO_CONSTANTS.DELETING_ADDRESS_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Searching Addresses"
                      contentGif={INFO_CONSTANTS.SEARCHING_ADDRESS_GIF}
                      contentText={INFO_CONSTANTS.SEARCHING_ADDRESS_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Watchlist Address Data"
                      contentGif={INFO_CONSTANTS.WATCHLIST_ADDRESS_DATA_GIF}
                      contentText={INFO_CONSTANTS.WATCHLIST_ADDRESS_DATA_TEXT}
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
                      contentGif={INFO_CONSTANTS.VIEWING_TRANSACTIONS_GIF}
                      contentText={INFO_CONSTANTS.VIEWING_TRANSACTIONS_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Deleting Transactions and Clearing Feed"
                      contentGif={INFO_CONSTANTS.DELETING_TRANSACTIONS_GIF}
                      contentText={INFO_CONSTANTS.DELETING_TRANSACTIONS_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Pausing/Starting Feed"
                      contentGif={INFO_CONSTANTS.PAUSING_STARTING_FEED_GIF}
                      contentText={INFO_CONSTANTS.PAUSING_STARTING_FEED_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Feed Pagination"
                      contentGif={INFO_CONSTANTS.FEED_PAGINATION_GIF}
                      contentText={INFO_CONSTANTS.FEED_PAGINATION_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Sorting and Searching"
                      contentGif={INFO_CONSTANTS.SORTING_SEARCHING_GIF}
                      contentText={INFO_CONSTANTS.SORTING_SEARCHING_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Feed Data"
                      contentGif={INFO_CONSTANTS.FEED_DATA_GIF}
                      contentText={INFO_CONSTANTS.FEED_DATA_TEXT}
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
                      contentGif={INFO_CONSTANTS.CHAT_GIF}
                      contentText={INFO_CONSTANTS.CHAT_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Share Transactions and Addresses"
                      contentGif={INFO_CONSTANTS.SHARE_GIF}
                      contentText={INFO_CONSTANTS.SHARE_TEXT}
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
                      contentGif={INFO_CONSTANTS.BREAK_GIF}
                      contentText={INFO_CONSTANTS.BREAK_TEXT}
                      setContentGif={setContentGif}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Have some fun"
                      contentGif={INFO_CONSTANTS.FUN_GIF}
                      contentText={INFO_CONSTANTS.FUN_TEXT}
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
            <hr style={{ width: "100%" }} />
            <p>{contentText}</p>
            <hr style={{ width: "50%" }} />
            <b>{contentLabel}</b>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Info;
