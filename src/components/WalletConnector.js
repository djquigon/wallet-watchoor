import {useState, useEffect} from 'react'
import WalletConnectorCSS from "../style/WalletConnector.module.css"
import {FaWindowClose, FaExternalLinkAlt} from "react-icons/fa";
import chef from "../assets/chef.png"

const WalletConnector = () => {
    const [account, setAccount] = useState(null)
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    const chainChangedHandler = () => {
        window.location.reload()
    }

    const accountChangedHandler = (newAccount) => {
        if (newAccount.length === 0) {newAccount = null}
        //for when multiple addresses are connected
        else if (Array.isArray(newAccount)) {newAccount = newAccount[0]}
        setAccount(newAccount)
    }
    
    const connectWallet = () => {
        if (typeof window.ethereum !== 'undefined') {
            if (account){
                toggleModal()
            } else {
                window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0])
                })
            }
        } else {
            window.alert('MetaMask is not installed. Please download this first.');
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' })
                if (accounts.length > 0){
                    window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(result => {
                        accountChangedHandler(result[0])
                    })
                }
            }
        }
        connectWalletOnPageLoad()
    }, [])

    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', accountChangedHandler)
        window.ethereum.on('chainChanged', chainChangedHandler)
    }

    /**Removed scrolling if modal is active */
    if(modal) {
        document.body.classList.add('activeModal')
      } else {
        document.body.classList.remove('activeModal')
    }

    return (
        <>
            <button id={WalletConnectorCSS.connectBtn} onClick={connectWallet}>
                {account ? account.toString().substring(0, 6) + "..." + account.toString().substring(account.length - 4) : "Connect Wallet"}
            </button>
            {modal && (
                <div className={WalletConnectorCSS.modal}>
                    <div onClick={toggleModal} className={WalletConnectorCSS.overlay}></div>
                    <div className={WalletConnectorCSS.modalContent}>
                    <h2>Account</h2>
                    <div id={WalletConnectorCSS.modalAccountInfo}>
                        <img src={chef}></img>
                        <p>{account}</p>
                        <a target='_blank' href={'https://etherscan.io/address/' + account}>
                            <FaExternalLinkAlt color='white'/>
                            &nbsp;View on Explorer
                        </a>
                    </div>
                    <button id={WalletConnectorCSS.closeModalBtn} onClick={toggleModal} style={{width: '1em', height: '1em'}}>
                        <FaWindowClose/>
                    </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default WalletConnector