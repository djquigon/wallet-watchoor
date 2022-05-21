import React, { useEffect, useState } from "react";
import ChainNavCSS from "../style/ChainNav.module.css";
import WalletConnector from "./WalletConnector";
import { AiOutlineLoading } from "react-icons/ai";
import etherscanLogo from "../assets/etherscanlogo.png";
import { ethers } from "ethers";
import ReactTooltip from "react-tooltip";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const ChainNav = ({ block, setBlock, account, handleAccount }) => {
  // const [chain, setChain] = useState("ethereum")
  const [refreshTime, setRefreshTime] = useState(null);

  const getBlock = async () => {
    console.log("Getting Block...");
    const blockInfo = await provider.getBlockWithTransactions();
    console.log(blockInfo);
    setBlock(blockInfo);
    setRefreshTime(15);
    console.log("Timer Reset");
  };

  const setTime = () => {
    setRefreshTime((refreshTime) => (refreshTime > 0 ? refreshTime - 1 : null));
  };

  const convertBlockAge = (timestamp) => {
    const time = new Date(timestamp * 1000).toLocaleTimeString("en-US");
    return time;
  };

  const getBurntFees = () => {
    const baseFeePerGas = ethers.utils.formatEther(
      parseInt(block.baseFeePerGas._hex, 16)
    );
    const gasUsed = parseInt(block.gasUsed._hex, 16);
    return baseFeePerGas * gasUsed;
  };

  useEffect(() => {
    //call for initial load
    getBlock();
    //set loading somewhere and have conditionals for elements
    const blockUpdater = setInterval(getBlock, 15000);
    const timeUpdater = setInterval(setTime, 1000);
    /**cleanup */
    return () => {
      clearInterval(blockUpdater);
      clearInterval(timeUpdater);
    };
  }, []);

  return (
    <nav id={ChainNavCSS.chainNav}>
      <div id={ChainNavCSS.chainContainer}>
        <button
          id={ChainNavCSS.toggledChain}
          className={ChainNavCSS.chainChangeBtn}
        >
          Ethereum
        </button>
        <button className={ChainNavCSS.chainChangeBtn}>BSC</button>
        <button className={ChainNavCSS.chainChangeBtn}>Avalanche</button>
        <button className={ChainNavCSS.chainChangeBtn}>Polygon</button>
        <button className={ChainNavCSS.chainChangeBtn}>Fantom</button>
        <button className={ChainNavCSS.chainChangeBtn}>Harmony</button>
        <button className={ChainNavCSS.chainChangeBtn}>Arbitrum</button>
        <button className={ChainNavCSS.chainChangeBtn}>Optimism</button>
        <div id={ChainNavCSS.blockInfo}>
          <p>
            🟢 Block&nbsp;
            <em id={ChainNavCSS.blockNumber} style={{ color: "#1eff00" }}>
              {block ? (
                `#${block.number}`
              ) : (
                <AiOutlineLoading className="loadingSvg" />
              )}
            </em>
          </p>
          <p>
            {block ? (
              block.transactions.length
            ) : (
              <AiOutlineLoading className="loadingSvg" />
            )}{" "}
            txn(s)
          </p>
          <p>
            <em id={ChainNavCSS.gasUsed} style={{ color: "#ff1500" }}>
              {block ? (
                parseInt(block.gasUsed._hex, 16).toLocaleString("en-US")
              ) : (
                <AiOutlineLoading className="loadingSvg" />
              )}{" "}
            </em>
            gas used ⛽
          </p>
          <p>
            <em id={ChainNavCSS.feesBurnt} style={{ color: "#ff5500" }}>
              {block ? (
                getBurntFees().toFixed(3)
              ) : (
                <AiOutlineLoading className="loadingSvg" />
              )}{" "}
              Ξ{" "}
            </em>
            in fees burnt 🔥
          </p>
          <span>
            Block created{" "}
            {block ? (
              convertBlockAge(block.timestamp)
            ) : (
              <AiOutlineLoading className="loadingSvg" />
            )}{" "}
            EST{" "}
            <a
              target="_blank"
              href={block && `https://etherscan.io/block/${block.number}`}
            >
              <ReactTooltip id="etherscanBlock" class="tooltip" />
              <img
                data-for="etherscanBlock"
                data-tip="View block on etherscan"
                height="14px"
                src={etherscanLogo}
              ></img>
            </a>
          </span>
          <b style={{ width: "115px", color: "#7a86fb" }}>
            Refresh in{" "}
            {refreshTime ? (
              refreshTime
            ) : (
              <AiOutlineLoading className="loadingSvg" />
            )}
          </b>
        </div>
      </div>
      <WalletConnector account={account} handleAccount={handleAccount} />
    </nav>
  );
};

export default ChainNav;
