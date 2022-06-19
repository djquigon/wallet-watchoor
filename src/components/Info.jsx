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
  const [displayAccountViewer, setDisplayAccountViewer] = useState(false);

  const [contentMP4, setContentMP4] = useState(INFO_CONSTANTS.WELCOME_MP4); //welcome
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
              <img width="16px" src={watchoor} alt="watchoor logo"></img> Wallet
              Watchoor Handbook
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
                      contentMP4={INFO_CONSTANTS.WELCOME_MP4}
                      contentText={INFO_CONSTANTS.WELCOME_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Dashboard Basics"
                      contentMP4={INFO_CONSTANTS.DASHBOARD_BASICS_MP4}
                      contentText={INFO_CONSTANTS.DASHBOARD_BASICS_TEXT}
                      setContentMP4={setContentMP4}
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
                      contentMP4={INFO_CONSTANTS.ADDING_ADDRESS_MP4}
                      contentText={INFO_CONSTANTS.ADDING_ADDRESS_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Deleting or Muting Addresses"
                      contentMP4={INFO_CONSTANTS.DELETING_ADDRESS_MP4}
                      contentText={INFO_CONSTANTS.DELETING_ADDRESS_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Searching Addresses"
                      contentMP4={INFO_CONSTANTS.SEARCHING_ADDRESS_MP4}
                      contentText={INFO_CONSTANTS.SEARCHING_ADDRESS_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Watchlist Address Data"
                      contentMP4={INFO_CONSTANTS.WATCHLIST_ADDRESS_DATA_MP4}
                      contentText={INFO_CONSTANTS.WATCHLIST_ADDRESS_DATA_TEXT}
                      setContentMP4={setContentMP4}
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
                      contentMP4={INFO_CONSTANTS.VIEWING_TRANSACTIONS_MP4}
                      contentText={INFO_CONSTANTS.VIEWING_TRANSACTIONS_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Deleting Transactions and Clearing Feed"
                      contentMP4={INFO_CONSTANTS.DELETING_TRANSACTIONS_MP4}
                      contentText={INFO_CONSTANTS.DELETING_TRANSACTIONS_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Pausing/Starting Feed"
                      contentMP4={INFO_CONSTANTS.PAUSING_STARTING_FEED_MP4}
                      contentText={INFO_CONSTANTS.PAUSING_STARTING_FEED_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Feed Pagination"
                      contentMP4={INFO_CONSTANTS.FEED_PAGINATION_MP4}
                      contentText={INFO_CONSTANTS.FEED_PAGINATION_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Sorting and Searching"
                      contentMP4={INFO_CONSTANTS.SORTING_SEARCHING_MP4}
                      contentText={INFO_CONSTANTS.SORTING_SEARCHING_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Feed Data"
                      contentMP4={INFO_CONSTANTS.FEED_DATA_MP4}
                      contentText={INFO_CONSTANTS.FEED_DATA_TEXT}
                      setContentMP4={setContentMP4}
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
                      contentMP4={INFO_CONSTANTS.CHAT_MP4}
                      contentText={INFO_CONSTANTS.CHAT_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                    <InfoSublistItem
                      contentLabel="Share Transactions and Addresses"
                      contentMP4={INFO_CONSTANTS.SHARE_MP4}
                      contentText={INFO_CONSTANTS.SHARE_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                  </ul>
                ) : null}
              </li>
              <li className={InfoCSS.featureList}>
                <div
                  onClick={() => {
                    setDisplayAccountViewer(!displayAccountViewer);
                  }}
                >
                  Account Viewer
                </div>
                {displayAccountViewer ? (
                  <ul className={InfoCSS.sublist}>
                    <InfoSublistItem
                      contentLabel="Take a Break"
                      contentMP4={INFO_CONSTANTS.BREAK_MP4}
                      contentText={INFO_CONSTANTS.BREAK_TEXT}
                      setContentMP4={setContentMP4}
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
                      contentMP4={INFO_CONSTANTS.BREAK_MP4}
                      contentText={INFO_CONSTANTS.BREAK_TEXT}
                      setContentMP4={setContentMP4}
                      setContentText={setContentText}
                      setContentLabel={setContentLabel}
                    />
                  </ul>
                ) : null}
              </li>
            </ul>
          </div>
          <div className={InfoCSS.handbookContent}>
            <video
              src={contentMP4}
              type="video/mp4"
              width="70%"
              height="70%"
              autoPlay
              loop
            />
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
