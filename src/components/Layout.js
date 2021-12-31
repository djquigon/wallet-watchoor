import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="App">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout
