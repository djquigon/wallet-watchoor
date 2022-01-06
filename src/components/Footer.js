import React from 'react'
import "../style/Footer.module.css"

const Footer = () => {
    const today = new Date()
    return (
        <footer>
            <a href="#">Twitter 🐦</a>
            <a href="#">Discord 💬</a>
            <p>Copyright &copy; {today.getFullYear()}</p>
            <a href="#">Bug Report 🐛</a>
            <a href="#">Feature Request 🆕</a>
        </footer>
    )
}

export default Footer
