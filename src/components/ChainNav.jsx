import React, { useCallback, useEffect, useState, useContext } from "react";
import ChainNavCSS from "../style/ChainNav.module.css";
import WalletConnector from "./WalletConnector";
import { AiOutlineLoading } from "react-icons/ai";
import etherscanLogo from "../assets/etherscanlogo.png";
import { ethers } from "ethers";
import ReactTooltip from "react-tooltip";
import { AppContext } from "../App";

const ChainNav = ({ block, setBlock }) => {
  const { chainID, provider, account, setAccount } = useContext(AppContext);
  const [refreshTime, setRefreshTime] = useState(null);

  const setTime = () => {
    setRefreshTime((refreshTime) => (refreshTime > 0 ? refreshTime - 1 : null));
  };

  const convertBlockAge = (timestamp) => {
    const convertedTimestamp = new Date(timestamp * 1000).toISOString();

    const time = `${convertedTimestamp.substring(
      0,
      convertedTimestamp.indexOf("T")
    )} ${convertedTimestamp.substring(
      convertedTimestamp.indexOf("T") + 1,
      convertedTimestamp.indexOf(".")
    )} UTC`;
    return time;
  };

  const getBurntFees = () => {
    const baseFeePerGas = ethers.utils.formatEther(
      parseInt(block.baseFeePerGas._hex, 16)
    );
    const gasUsed = parseInt(block.gasUsed._hex, 16);
    return baseFeePerGas * gasUsed;
  };

  const getBlock = useCallback(async () => {
    console.log("Getting Block...");
    const blockInfo = await provider.getBlockWithTransactions();
    console.log(blockInfo);
    setBlock(blockInfo);
    setRefreshTime(15);
    console.log("Timer Reset");
  }, [setBlock]);

  useEffect(() => {
    //call for initial load
    if (provider) {
      getBlock();
      //set loading somewhere and have conditionals for elements
      const blockUpdater = setInterval(getBlock, 15000);
      const timeUpdater = setInterval(setTime, 1000);
      /**cleanup */
      return () => {
        clearInterval(blockUpdater);
        clearInterval(timeUpdater);
      };
    }
  }, [getBlock]);

  return (
    <nav id={ChainNavCSS.chainNav}>
      {window.ethereum && chainID === 1 && (
        <div id={ChainNavCSS.chainContainer}>
          <button
            id={ChainNavCSS.toggledChain}
            className={ChainNavCSS.chainChangeBtn}
          >
            Ethereum
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            BSC
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Avalanche
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Polygon
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Fantom
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Harmony
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Arbitrum
          </button>
          <button
            onClick={() => {
              alert("Coming soon...");
            }}
            className={ChainNavCSS.chainChangeBtn}
          >
            Optimism
          </button>
          <div id={ChainNavCSS.blockInfo}>
            <p>
              ???? Block&nbsp;
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
              gas used ???
            </p>
            <p>
              <em id={ChainNavCSS.feesBurnt} style={{ color: "#ff5500" }}>
                {block ? (
                  getBurntFees().toFixed(3)
                ) : (
                  <AiOutlineLoading className="loadingSvg" />
                )}{" "}
                ??{" "}
              </em>
              in fees burnt ????
            </p>
            <span>
              Block created{" "}
              {block ? (
                convertBlockAge(block.timestamp)
              ) : (
                <AiOutlineLoading className="loadingSvg" />
              )}{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={block && `https://etherscan.io/block/${block.number}`}
              >
                <ReactTooltip id="etherscanBlock" class="tooltip" />
                <img
                  data-for="etherscanBlock"
                  data-tip="View block on etherscan"
                  height="14px"
                  src={etherscanLogo}
                  alt="etherscan logo"
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
      )}
      <WalletConnector account={account} setAccount={setAccount} />
    </nav>
  );
};

export default ChainNav;
