import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Navbar.css"
import logo from "../assets/logo.gif"
import {MdInfo} from "react-icons/md"
/** Use in app */
import {FaGithub, FaMedium, FaGasPump} from "react-icons/fa";
import {ImEnter} from "react-icons/im";

const Navbar = () => {
    return (
        <nav>
            <ul id="menu">
                <li>
                    <div id="logo-container">
                        <img id="logo" src={logo}></img>
                        <div id="logo-overlay">
                            <a href="https://github.com/djquigon"><FaGithub/></a>
                            <a href="https://www.linkedin.com/in/logan-scheid-287753137"><FaMedium/></a>
                        </div>
                    </div>
                    <Link to="/" style={{fontSize: "14px"}}>Wallet Watchoor<small>&#8482;</small></Link>
                </li>
                <li className="menu-item">
                    <Link to="app">
                        <ImEnter className='menu-icon'/>
                        <p>Enter App</p>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link to="info">
                        <MdInfo className='menu-icon'/>
                        <p>Learn More</p>
                    </Link>
                </li>
                <li className="menu-item" id="gwei-tracker">
                    <a target="_blank" href="https://etherscan.io/gastracker">
                        <FaGasPump className='menu-icon'/>
                        <p>92 Gwei</p>
                    </a>
                </li>
                <li className="menu-item">
                    <button id="theme-btn">
                        <span role="img">🌞</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
