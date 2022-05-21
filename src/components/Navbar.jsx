import {useState, useEffect, useContext, setContext} from 'react'
import { Link } from 'react-router-dom'
import NavbarCSS from "../style/Navbar.module.css"
import logo from "../assets/logo.gif"
import {MdInfo} from "react-icons/md"
/** Use in app */
import {FaGithub, FaMedium, FaGasPump, FaEthereum} from "react-icons/fa";
import {AiOutlineLoading} from "react-icons/ai"
import {ImEnter} from "react-icons/im";
import {ethers} from 'ethers';
import { ThemeContext } from './Layout'
import axios from 'axios';

const provider = new ethers.providers.Web3Provider(window.ethereum)


const Navbar = () => {

    const [gasPrice, setGasPrice] = useState(null)
    const {theme, setTheme} = useContext(ThemeContext)
    const [etherPriceInfo, setEtherPriceInfo] = useState(null)

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
        //for persistence
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }

    const getEtherPriceInfo = async () => {
        console.log("Getting Price info...")
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        setEtherPriceInfo(
                {currPrice: res.data[0].current_price, 
                mktCap: ((res.data[0].market_cap)/1000000000).toFixed(1), 
                vol: (res.data[0].total_volume).toLocaleString('en-US'), 
                priceChange: res.data[0].price_change_percentage_24h.toFixed(2), 
                daysSinceAth: ((new Date() - new Date(res.data[0].ath_date)) / (1000 * 60 * 60 * 24)).toFixed(2)}
        )
    }

    const fetchGasPrice = async () => {
        console.log("Getting gas info...")
        if (typeof window.ethereum !== 'undefined') {
            const feeData = await provider.getFeeData()

            const maxFee = parseInt(ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei"))
            const gasPrice = parseInt(ethers.utils.formatUnits(feeData.gasPrice, "gwei"))
            //set gas to avg of two
            // setGasPrice(Math.round((maxFee+gasPrice)/2))
            setGasPrice(Math.round(gasPrice))
        }
    }
    

    useEffect(() => {
        //call for initial load
        getEtherPriceInfo()
        fetchGasPrice()
        const etherPriceUpdater = setInterval(getEtherPriceInfo, 60000)
        const gasPriceUpdater = setInterval(fetchGasPrice, 15000)
        return () => { 
            clearInterval(etherPriceUpdater)
            clearInterval(gasPriceUpdater)
        }
    }, [])

    return (
        <nav id={NavbarCSS.navMenu}>
            <ul id={NavbarCSS.menu}>
                <li>
                    <div id={NavbarCSS.logoContainer}>
                        <img id={NavbarCSS.logo} src={logo}></img>
                        <div id={NavbarCSS.logoOverlay}>
                            <a href="https://github.com/djquigon"><FaGithub/></a>
                            <a href="https://medium.com/@scheidlogan"><FaMedium/></a>
                        </div>
                    </div>
                    <Link to="/" style={{fontSize: "14px"}}>Wallet Watchoor<small>&#8482;</small></Link>
                </li>
                <li className={NavbarCSS.menuItem}>
                    <Link to="app">
                        <ImEnter className={NavbarCSS.menuIcon}/>
                        <p>Enter App</p>
                    </Link>
                </li>
                <li className={NavbarCSS.menuItem}>
                    <Link to="info">
                        <MdInfo className={NavbarCSS.menuIcon}/>
                        <p>Learn More</p>
                    </Link>
                </li>
                <li className={NavbarCSS.menuItem} id={NavbarCSS.gweiTracker}>
                    <a target="_blank" href="https://etherscan.io/gastracker">
                        <FaGasPump className={NavbarCSS.menuIcon}/>
                        <p>{gasPrice ? gasPrice + " Gwei" : <AiOutlineLoading className="loadingSvg"/>}</p>
                    </a>
                </li>
                <li className={NavbarCSS.menuItem}>
                    <span>
                        <FaEthereum/> 
                        {etherPriceInfo ? 
                            <p>${etherPriceInfo.currPrice} <br></br> {etherPriceInfo.priceChange < 0 ? 
                                <b style={{color: "red"}}>
                                    {etherPriceInfo.priceChange}%
                                </b> 
                                : <b style={{color: "#00ca00"}}>+{etherPriceInfo.priceChange}%</b>}</p> 
                        : <AiOutlineLoading className="loadingSvg"/>}
                        {/* <p>Market Cap:</p>
                        <p>{etherPriceInfo ? `$${etherPriceInfo.mktCap}B` : <AiOutlineLoading className="loadingSvg"/>}</p>
                        <p>24h Volume:</p>
                        <p>{etherPriceInfo ? `$${etherPriceInfo.vol}` : <AiOutlineLoading className="loadingSvg"/>}</p>
                        <p>Days since ATH:</p>
                        <p>{etherPriceInfo ? `${etherPriceInfo.daysSinceAth}` : <AiOutlineLoading className="loadingSvg"/>}</p> */}
                    </span>
                </li>
                <li className={NavbarCSS.menuItem}>
                    <button id={NavbarCSS.themeBtn} onClick={toggleTheme}>
                        <span role="img">{theme === 'light' ? '🌞' : '🌚'}</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
