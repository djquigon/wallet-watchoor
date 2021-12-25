import React from 'react'
import "../style/Content.css"

const Content = () => {
    const handleConnectWallet = () => {
        console.log("You clicked")
    }
    const handleConnectWallet2 = (name) => {
        console.log(name + "You clicked")
    }
    return (
        <main>
            {/*need to have an anonymous arrow function to pass into a function in jsx like in comment below */}
            {/* <button onClick={() => {handleConnectWallet2("Tom")}}>Connect Wallet</button> */}
            <div>  
                <button id="connect-btn"onClick={{handleConnectWallet}}>Connect Wallet</button>
                <h1>Welcome Watchooooooors</h1>
                <p>Tired of getting dumped on unknowingly by your favorite influencers? Need a way to get ahead of the curve?</p>
                <iframe src="https://www.youtube.com/embed/61Q6wWu5ziY" title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
                <p>Wallet Watchoor allows you to track those influencers on chain, and receive alerts directly to your browser! 
                    No more unnanounced dumps from 3AC or Alameda wallets! Start by connecting your wallet so you can start adding 
                    addresses to your watch list to populate your feed. Wanna talk to the other on-chain checkoors? Check out the trollbox.
                </p>
            </div>     
        </main>
    )
}

export default Content
