import {useState, useEffect, useContext, setContext} from 'react'
import { Link } from 'react-router-dom'
import NavbarCSS from "../style/Navbar.module.css"
import logo from "../assets/logo.gif"
import {MdInfo} from "react-icons/md"
/** Use in app */
import {FaGithub, FaMedium, FaGasPump} from "react-icons/fa";
import {ImEnter} from "react-icons/im";
import {ethers} from 'ethers';
import { ThemeContext, provider } from './Layout'


const Navbar = () => {

    const [gasPrice, setGasPrice] = useState(0)
    const {theme, setTheme} = useContext(ThemeContext)

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
        //for persistence
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }

    const fetchGasPrice = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const feeData = await provider.getFeeData()

            const maxFee = parseInt(ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei"))
            const gasPrice = parseInt(ethers.utils.formatUnits(feeData.gasPrice, "gwei"))
            //set gas to avg of two
            // setGasPrice(Math.round((maxFee+gasPrice)/2))
            setGasPrice(Math.round(gasPrice))
        }
    }
    

    useEffect(() => {
        const gasPriceUpdater = setInterval(fetchGasPrice, 5000)
        return () => { 
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
                        <p>{gasPrice} Gwei</p>
                    </a>
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
