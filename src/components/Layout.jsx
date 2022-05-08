import {createContext, useState} from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

/*Context makes state avaliable to all components it encomapsses? look this up*/
export const ThemeContext = createContext(null)

const Layout = () => {

    /*If the user has theme in local storage use it, if not use light by default */
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className="App" id={theme}>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </div>
        </ThemeContext.Provider>
    )
}

export default Layout
