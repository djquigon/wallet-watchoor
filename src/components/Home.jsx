import { useContext } from "react";
import { Link } from "react-router-dom";
import HomeCSS from "../style/Home.module.css";
import { ImFeed } from "react-icons/im";
import { RiContactsBookFill } from "react-icons/ri";
import { GrDos } from "react-icons/gr";
import { GiFox } from "react-icons/gi";
import { IoMdChatboxes } from "react-icons/io";
import WalletConnector from "./WalletConnector";
import Footer from "./Footer";
import { ThemeContext } from "./Layout";
// import lightHeader from "../assets/light_header.png";
// import darkHeader from "../assets/dark_header.png";

const Home = ({ account, handleAccount }) => {
  const theme = useContext(ThemeContext);
  // const headerBackground = `url(${
  //   theme.theme === "light" ? lightHeader : darkHeader
  // })  0% 0% / cover`;
  const featureColor = theme.theme === "light" ? "#f4ad49" : "#829fc3";
  const headerColor = theme.theme === "light" ? "black" : "white";

  return (
    <>
      <header
        id={HomeCSS.header}
        style={{
          // background: headerBackground,
          color: headerColor,
        }}
      >
        <div id={HomeCSS.headerConnectBtn}>
          <WalletConnector account={account} handleAccount={handleAccount} />
        </div>
        <div id={HomeCSS.headerContent}>
          <h1>Welcome Watchoors</h1>
          <h3>
            Tired of being dumped on unknowingly by your favorite influencers
            and hedge funds? Missed out on a few projects you should have been
            early on? Need a way to get ahead of the curve?
          </h3>
          <div id={HomeCSS.landingBtns}>
            <Link to="app">
              <button>Enter App</button>
            </Link>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/Phh6A2nW"
            >
              <button>Join the Community</button>
            </a>
          </div>
        </div>
      </header>
      <main>
        <h1 className={HomeCSS.landingText}>
          🕵️‍♂️ Never get caught lacking again. 🕵️‍♀️
        </h1>
        <div id={HomeCSS.featuresRow}>
          <div className={HomeCSS.feature}>
            <div className={HomeCSS.featureImg}>
              <Link to="app">
                <RiContactsBookFill
                  style={{
                    color: featureColor,
                  }}
                />
              </Link>
            </div>
            <h1>WatchList</h1>
            <h3>Currate what you want to see.</h3>
            <p>
              Add addresses you want to track to see their activity on your
              feed.
            </p>
          </div>
          <div className={HomeCSS.feature}>
            <div className={HomeCSS.featureImg}>
              <Link to="app">
                <ImFeed
                  style={{
                    color: featureColor,
                  }}
                />
              </Link>
            </div>
            <h1>Feed</h1>
            <h3>Keep an eye out.</h3>
            <p>
              Track transactions from addresses on your watchlist and get
              instant notifications.
            </p>
          </div>
          <div className={HomeCSS.feature}>
            <div className={HomeCSS.featureImg}>
              <Link to="app">
                <IoMdChatboxes
                  style={{
                    color: featureColor,
                  }}
                />
              </Link>
            </div>
            <h1>Trollbox</h1>
            <h3>Spread the word.</h3>
            <p>
              Talk to other watchoors and keep each other posted with memes and
              information.
            </p>
          </div>
          <div className={HomeCSS.feature}>
            <div className={HomeCSS.featureImg}>
              <Link to="app">
                <GrDos
                  style={{
                    color: featureColor,
                  }}
                />
              </Link>
            </div>
            <h1>Dosbox</h1>
            <h3>Tired of watchooring?</h3>
            <p>Take a break and play some classic Dos games in the meantime.</p>
          </div>
        </div>
        <h3 className={HomeCSS.landingText}>
          Wallet Watchoor allows you to track any address on chain, and receive
          audio alerts in your browser whenever transactions are sent to or from
          that address. Whether it be transfers from an influencer or hedge
          fund's address, transfers of a certain ERC-20 token, or transfers of a
          specific ERC-721 NFT collection, never be suprised again. Start by
          connecting your wallet so you can access the app and explore the many
          features it has to offer. If you don't have metamask or a web3 wallet
          provider installed in your browser, you won't be able to access the
          app. You can install metamask via the link below.
        </h3>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://metamask.io/"
          style={{ textDecoration: "none" }}
        >
          <h4 id={HomeCSS.metamaskLink}>
            Download Metamask <GiFox />
          </h4>
        </a>
        <iframe
          src="https://www.youtube.com/embed/61Q6wWu5ziY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <h3 className={HomeCSS.landingText}>
          Head to the learn more tab to view an in depth handbook covering how
          the app and all of its different features work.
        </h3>
      </main>
      <Footer />
    </>
  );
};

export default Home;
