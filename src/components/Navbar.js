import React from 'react'
import "../style/Navbar.css"
import logo from "../assets/logo.gif"
import address_book from "../assets/address_book.png"
import chat from "../assets/chat.png"
import feed from "../assets/feed.png"
import game from "../assets/game.png"
import search from "../assets/search.png"

const Navbar = () => {
    return (
        <nav>
            <img id="logo" src={logo}></img>
            <h1>Wallet Watchoor<small>&#8482;</small></h1>
            <ul id="menu">
                <li><a href="#"><img className="menu-icon" src={search}></img></a></li>
                <li><a href="#"><img className="menu-icon" src={address_book}></img></a></li>
                <li><a href="#"><img className="menu-icon" src={feed}></img></a></li>
                <li><a href="#"><img className="menu-icon" src={chat}></img></a></li>
                <li><a href="#"><img className="menu-icon" src={game}></img></a></li>
            </ul>
        </nav>
    )
}

export default Navbar
