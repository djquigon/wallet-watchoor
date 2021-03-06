import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavbarCSS from "../style/Navbar.module.css";
import logo from "../assets/logo.gif";
import { MdInfo } from "react-icons/md";
import { FaGithub, FaMedium, FaGasPump, FaEthereum } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { ImEnter } from "react-icons/im";
import { GiFox } from "react-icons/gi";
import { ethers } from "ethers";
import { ThemeContext } from "./Layout";
import { AppContext } from "../App";

import axios from "axios";
import ReactTooltip from "react-tooltip";

const Navbar = () => {
  const { provider, chainID } = useContext(AppContext);
  const [gasPrice, setGasPrice] = useState(null);
  const { theme, setTheme } = useContext(ThemeContext);
  const [etherPriceInfo, setEtherPriceInfo] = useState(null);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    //for persistence
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const getEtherPriceInfo = async () => {
    console.log("Getting Price info...");
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    setEtherPriceInfo({
      currPrice: res.data[0].current_price,
      mktCap: (res.data[0].market_cap / 1000000000).toFixed(1),
      vol: (res.data[0].total_volume / 1000000000).toFixed(1),
      priceChange: res.data[0].price_change_percentage_24h.toFixed(2),
      daysSinceAth: (
        (new Date() - new Date(res.data[0].ath_date)) /
        (1000 * 60 * 60 * 24)
      ).toFixed(2),
    });
  };

  const fetchGasPrice = async () => {
    console.log("Getting gas info...");
    if (typeof window.ethereum !== "undefined") {
      const feeData = await provider.getFeeData();

      const gasPrice = parseInt(
        ethers.utils.formatUnits(feeData.gasPrice, "gwei")
      );
      //set gas to avg of two
      // setGasPrice(Math.round((maxFee+gasPrice)/2))
      setGasPrice(Math.round(gasPrice));
    }
  };

  useEffect(() => {
    //call for initial load
    getEtherPriceInfo();
    fetchGasPrice();
    const etherPriceUpdater = setInterval(getEtherPriceInfo, 60000);
    const gasPriceUpdater = setInterval(fetchGasPrice, 60000);
    return () => {
      clearInterval(etherPriceUpdater);
      clearInterval(gasPriceUpdater);
    };
  }, []);

  return (
    <nav id={NavbarCSS.navMenu}>
      <ul id={NavbarCSS.menu}>
        <li>
          <div id={NavbarCSS.logoContainer}>
            <img id={NavbarCSS.logo} src={logo} alt="watchoor logo"></img>
            <div id={NavbarCSS.logoOverlay}>
              <a href="https://github.com/djquigon">
                <FaGithub />
              </a>
              <a href="https://medium.com/@scheidlogan">
                <FaMedium />
              </a>
            </div>
          </div>
          <Link to="/" style={{ fontSize: "14px" }}>
            Wallet Watchoor<small>&#8482;</small>
          </Link>
        </li>
        <li className={NavbarCSS.menuItem}>
          <Link to="/app">
            <ImEnter className={NavbarCSS.menuIcon} />
            <p>Enter App</p>
          </Link>
        </li>
        <li className={NavbarCSS.menuItem}>
          <Link to="/info">
            <MdInfo className={NavbarCSS.menuIcon} />
            <p>Learn More</p>
          </Link>
        </li>
        <li className={NavbarCSS.menuItem} id={NavbarCSS.priceTracker}>
          {etherPriceInfo ? (
            <>
              <ReactTooltip id="price" class={NavbarCSS.priceTooltip} />
              <span
                data-tip={`Mkt Cap:<br/>$${etherPriceInfo.mktCap}B<br/>24h Vol:<br/>${etherPriceInfo.vol}B<br/>Days since ATH:<br/>${etherPriceInfo.daysSinceAth}`}
                data-multiline="true"
                data-for="price"
                data-place="bottom"
                data-effect="solid"
              >
                <FaEthereum />
                <p>
                  ${etherPriceInfo.currPrice} <br></br>{" "}
                  {etherPriceInfo.priceChange < 0 ? (
                    <b style={{ color: "red" }}>
                      {etherPriceInfo.priceChange}%
                    </b>
                  ) : (
                    <b style={{ color: "#00ca00" }}>
                      +{etherPriceInfo.priceChange}%
                    </b>
                  )}
                </p>
              </span>
            </>
          ) : (
            <AiOutlineLoading className="loadingSvg" />
          )}
        </li>
        <li className={NavbarCSS.menuItem} id={NavbarCSS.gweiTracker}>
          {!window.ethereum && (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/"
              style={{
                color: "orange",
                textDecoration: "none",
                textShadow:
                  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                width: "75px",
              }}
            >
              Download <br /> Metamask <br /> <GiFox />
            </a>
          )}
          {chainID === 1 && (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://etherscan.io/gastracker"
            >
              <FaGasPump className={NavbarCSS.menuIcon} />
              <p>
                {gasPrice ? (
                  gasPrice + " Gwei"
                ) : (
                  <AiOutlineLoading className="loadingSvg" />
                )}
              </p>
            </a>
          )}
        </li>
        <li className={NavbarCSS.menuItem}>
          <button id={NavbarCSS.themeBtn} onClick={toggleTheme}>
            <span role="img">{theme === "light" ? "????" : "????"}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
