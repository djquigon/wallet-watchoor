import React from 'react'
import { Link } from 'react-router-dom'
import NavbarCSS from "../style/Navbar.module.css"
import logo from "../assets/logo.gif"
import {MdInfo} from "react-icons/md"
/** Use in app */
import {FaGithub, FaMedium, FaGasPump} from "react-icons/fa";
import {ImEnter} from "react-icons/im";

const Navbar = () => {
    return (
        <nav id={NavbarCSS.navMenu}>
            <ul id={NavbarCSS.menu}>
                <li>
                    <div id={NavbarCSS.logoContainer}>
                        <img id={NavbarCSS.logo} src={logo}></img>
                        <div id={NavbarCSS.logoOverlay}>
                            <a href="https://github.com/djquigon"><FaGithub/></a>
                            <a href="https://www.linkedin.com/in/logan-scheid-287753137"><FaMedium/></a>
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
                        <p>92 Gwei</p>
                    </a>
                </li>
                <li className={NavbarCSS.menuItem}>
                    <button id={NavbarCSS.themeBtn}>
                        <span role="img">🌞</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
