import { useCallback, useContext, useState, useEffect } from "react";
import WalletConnectorCSS from "../style/WalletConnector.module.css";
import { AiOutlineClose } from "react-icons/ai";
import etherscanLogo from "../assets/etherscanlogo.png";
import makeBlockie from "ethereum-blockies-base64";
import { ethers } from "ethers";
import { onValue, ref } from "firebase/database";
import { AppContext } from "../App";
import { FaEthereum } from "react-icons/fa";

/**
 * The WalletConnector component contains the connect wallet button and a wallet info modal
 *  as well as all the functionality for connecting a user's wallet.
 */
const WalletConnector = () => {
  const { database, chainID, account, setAccount } = useContext(AppContext);
  const [accountBalance, setAccountBalance] = useState(null);
  const [accountTransactionCount, setAccountTransactionCount] = useState(null);
  const [dateJoined, setDateJoined] = useState(null);
  const [numAddressesWatched, setNumAddressesWatched] = useState(null);
  const [numTransactionsWatched, setNumTransactionsWatched] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [modal, setModal] = useState(false);

  /**
   * Toggles the wallet info modal.
   */
  const toggleModal = () => {
    setModal(!modal);
  };

  /**
   * Gets the account info associated with an address from the DB.
   * @param { * } address
   */
  const getAccountDBInfo = (address) => {
    onValue(ref(database, `users/${address}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDateJoined(data.dateJoined);
        setNumAddressesWatched(Object.keys(data.watchedAddresses).length);
        setNumTransactionsWatched(data.numTransactionsWatched);
        setAvatar(data.avatar);
      }
    });
  };

  /**
   * Gets the txn count for an address from the DB.
   * @param { * } address
   */
  const getAccountTransactionCount = (address) => {
    window.ethereum
      .request({
        method: "eth_getTransactionCount",
        params: [address, "latest"],
      })
      .then((transactionCount) => {
        setAccountTransactionCount(parseInt(transactionCount, 16));
      });
  };

  /**
   * Gets the account balance in ETH for an address from the DB.
   * @param { * } address
   */
  const getAccountBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setAccountBalance(ethers.utils.formatEther(balance).substring(0, 5));
      });
  };

  /**
   * Reloads the page whenever a user change's the chain they are using.
   */
  const chainChangedHandler = () => {
    window.location.reload();
  };

  /**
   * Handles whenever a user changes their account address.
   * Adding callbacks to function below fixes issue with depdencies in useEffect
   */
  const accountChangedHandler = useCallback(
    (newAccount) => {
      if (newAccount.length === 0) {
        newAccount = null;
        setAccountBalance(null);
        setAccountTransactionCount(null);
        setDateJoined(null);
        setNumAddressesWatched(null);
        setNumTransactionsWatched(null);
        setAvatar(null);
      }
      //for when multiple addresses are connected
      else if (Array.isArray(newAccount)) {
        newAccount = newAccount[0];
      }
      setAccount(newAccount);
      if (newAccount) {
        getAccountBalance(newAccount.toString());
        getAccountTransactionCount(newAccount.toString());
        getAccountDBInfo(newAccount.toString());
      }
    },
    [setAccount]
  );

  /**
   * Connects the user's wallet to wallet watchoor.
   */
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      if (account) {
        toggleModal();
      } else {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            accountChangedHandler(accounts[0]);
          });
      }
    } else {
      window.alert(
        "MetaMask is not installed or could not be found. Please download this or any other compatible web3 wallet from your browsers app store to gain full access to this app."
      );
    }
  };

  /**
   * Prompts the user to change their chain because the one they're using is not supported.
   */
  const promptUserToChangeChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask, should not happen in this case b/c eth mainnet cannot be removed from metamask but keeping here anyway
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1",
                chainName: "Ethereum Mainnet",
                rpcUrls: ["https://main-rpc.linkpool.io"],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  /**
   * Attempts to reconnect a previously connected wallet when the page loads.
   */
  const connectWalletOnPageLoad = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            accountChangedHandler(accounts[0]);
          });
      }
      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);
    }
  }, [accountChangedHandler]);

  useEffect(() => {
    connectWalletOnPageLoad();
  }, [connectWalletOnPageLoad]);

  /**Removed scrolling if modal is active */
  if (modal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  return (
    <>
      {chainID === 1 ? (
        <button id={WalletConnectorCSS.connectBtn} onClick={connectWallet}>
          {account
            ? account.toString().substring(0, 6) +
              "..." +
              account.toString().substring(account.length - 4)
            : "Connect Wallet"}
        </button>
      ) : (
        <button
          id={WalletConnectorCSS.switchChainBtn}
          onClick={promptUserToChangeChain}
        >
          Switch to Ethereum Mainnet <FaEthereum />
        </button>
      )}
      {modal && (
        <div className={WalletConnectorCSS.modal}>
          <div
            onClick={toggleModal}
            className={WalletConnectorCSS.overlay}
          ></div>
          <div className={WalletConnectorCSS.modalContent}>
            <h2>Account</h2>
            <div id={WalletConnectorCSS.modalAccountInfo}>
              <img
                src={avatar ? avatar : makeBlockie(account)}
                alt="avatar"
              ></img>
              <p>{accountBalance + " Ξ"}</p>
              <p>{accountTransactionCount + " txn(s)"}</p>
              <p>{account}</p>
              <a
                target="_blank"
                rel="noreferrer"
                href={"https://etherscan.io/address/" + account}
              >
                View on Explorer{" "}
                <img
                  style={{ width: "1em", height: "1em" }}
                  src={etherscanLogo}
                  alt="etherscan logo"
                />
              </a>
            </div>
            <div id={WalletConnectorCSS.modalWatchoorInfo}>
              <p>
                Watching since{" "}
                {`${dateJoined.substring(
                  0,
                  dateJoined.indexOf("T")
                )} ${dateJoined.substring(
                  dateJoined.indexOf("T") + 1,
                  dateJoined.indexOf(".")
                )} UTC`}
              </p>
              <p>{numTransactionsWatched} txn(s) watched</p>
              <p>{numAddressesWatched} wallets watched</p>
            </div>
            <button
              id={WalletConnectorCSS.closeModalBtn}
              onClick={toggleModal}
              style={{ width: "1em", height: "1em", background: "none" }}
            >
              <AiOutlineClose color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnector;
