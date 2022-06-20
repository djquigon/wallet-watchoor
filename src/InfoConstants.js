import WELCOME from "./assets/info/WELCOME.mp4";
import DASHBOARD_BASICS from "./assets/info/DASHBOARD_BASICS.mp4"
import ADDING_ADDRESS from "./assets/info/ADDING_ADDRESS.mp4";
import DELETING_ADDRESS from "./assets/info/DELETING_ADDRESS.mp4";
import SEARCHING_ADDRESS from "./assets/info/SEARCHING_ADDRESS.mp4";
import WATCHLIST_ADDRESS_DATA from "./assets/info/WATCHLIST_ADDRESS_DATA.mp4";
import VIEWING_TRANSACTIONS from "./assets/info/VIEWING_TRANSACTIONS.mp4";
import DELETING_TRANSACTIONS from "./assets/info/DELETING_TRANSACTIONS.mp4";
import PAUSING_STARTING_FEED from "./assets/info/PAUSING_STARTING_FEED.mp4";
import FEED_PAGINATION from "./assets/info/FEED_PAGINATION.mp4";
import SORTING_SEARCHING from "./assets/info/SORTING_SEARCHING.mp4";
import FEED_DATA from "./assets/info/FEED_DATA.mp4";
import CHAT from "./assets/info/CHAT.mp4";
import SHARE from "./assets/info/SHARE.mp4";
import BREAK from "./assets/info/BREAK.mp4";

const INFO_CONSTANTS = {
    WELCOME_TEXT: 'Welcome to the Wallet Watchoor™ handbook. Wallet Watchoor is a dashboard for Ethereum and other EVM based chains, where you can view transactions from addresses you have followed. All that is required is a web3 wallet provider such as Metamask installed on your browser, which can be downloaded through the various links contained on this site. Your feed periodically updates every 15 seconds with new transactions from your watched addresses if any were detected. While you are watching™, you can chat with fellow watchoors in the Trollbox — a horrible knockoff of the bitmex™ trollbox. The Account Viewer component is an optional component where you can view info about a searched account, such as their ethereum and token holdings, average transactions a day, total transaction count, etc. There is also an optional Dosbox window you can open where you can play classic Dos games if you get bored. That sums up the general functionality of this site. For more specific info and guidance, click on the more specific topics listed on the left.',
    WELCOME_MP4: WELCOME,
    DASHBOARD_BASICS_TEXT: 'As described in the "Welcome" section, the dashboard consists of five main components: the Feed, Watchlist, Trollbox, Account Viewer, and Dosbox. By default, only the first 3 components are displayed as they are the most essential. If you wish to open these other components, you can do so via the buttons at the top of the feed component. Each components size is adjustable via the resizing handle and their position is adjustable by simply dragging and dropping. To ensure a component does not move or resize from its current orientation, you can click the red lock button at the top of the component and it will lock itself in place. There are certain limitations to the formatting, but for the most part you can orient each component in any way you want. The layout is saved into local storage so however you set it will persist over reloads. If for whatever reason you wish to reset your layout to the default settings, delete the value associated with key rgl-7 in your local storage or simply move everything back manually.',
    DASHBOARD_BASICS_MP4: DASHBOARD_BASICS,
    ADDING_ADDRESS_TEXT: 'Adding an address to your watchlist ensures in the future all transactions sent to or from said address are populated into your feed. To do so, type a valid ENS or ethereum address as well as an alias you wish to give to the address in the two fields at the top of the watchlist. Once added the address will appear at the end of your list. By default, a few popular addresses have been added to your watchlist to get you started. Some of these addresses such as Coinbase 5, FTX Exchnage, and the Uniswap Router V3 are not going to be practical to have on your feed, as they are apart of thousands of transactions every day and are only there initially to quickly exhibit how the app functions without having to wait. It is reccomended that you remove these addresses after you have done this and instead replace them with addresses you have gathered from people you choose to follow. These could range from influencers, to hedge funds, to even token contracts.',
    ADDING_ADDRESS_MP4: ADDING_ADDRESS,
    DELETING_ADDRESS_TEXT: 'Deleting an address from your watchlist ensures transactions to or from the previously saved address are no longer tracked in your feed. To do so, click on the trash can icon associated with the address you wish to delete. This action is irreversable, though you can simply add an address back if doing so was unintended. You can also mute an address if you simply wish to longer see their transactions in your feed, but do not want to fully remove it from your list. To do this click on the volume icon opposite the delete button associated with the address you wish to mute.',
    DELETING_ADDRESS_MP4: DELETING_ADDRESS,
    SEARCHING_ADDRESS_TEXT: 'Searching for an address in your watchlist may become imperative when it begins to fill up with addresses. To do so, type the alias and address or ENS associated with the address you wish to find into the search field below the two add address fields. The watchlist will the be filtered based on your search and then displayed.',
    SEARCHING_ADDRESS_MP4: SEARCHING_ADDRESS,
    WATCHLIST_ADDRESS_DATA_TEXT: 'Associated with each address in your watchlist are various links and information retreived from EIP-634 ENS text records associated with an ENS address. For this information to appear an address must have an associated ENS name as well as have set these text records, which is completely optional. These records include an avatar, an email, a location, a website url, a twitter username, and a telegram username. If no ENS records could be obtained, the only information included is the date when the address was added to your watchlist, an etherscan link, and the mute and delete buttons.',
    WATCHLIST_ADDRESS_DATA_MP4: WATCHLIST_ADDRESS_DATA,
    VIEWING_TRANSACTIONS_TEXT: 'Once you have at least one address added to your watchlist and your feed is unpaused, transactions to or from these addresses will begin populating in your feed as they occur. New transactions and their associated information appear at the top of your feed are marked with "! New". These are retrieved after every refresh, which occur every 15 second interval.',
    VIEWING_TRANSACTIONS_MP4: VIEWING_TRANSACTIONS,
    DELETING_TRANSACTIONS_TEXT: 'Deleting a transaction from your feed can be done by clicking the trash can icon associated with the transaction you wish to delete. This action is irreversable.  Clearing your feed removes every transaction in one command and is also irreversable. It can be done by clicking the bomb icon at the top right of the feed window.',
    DELETING_TRANSACTIONS_MP4: DELETING_TRANSACTIONS,
    PAUSING_STARTING_FEED_TEXT: 'By default your feed is unpaused and detecting transactions to or from your watchlist addresses. Optionally, you can pause your feed to no longer listen for any transactions to add by pressing the button to the left of the clear feed icon. Your feed will stay unchanged in this state, and can be unpaused by clicking the icon once again.',
    PAUSING_STARTING_FEED_MP4: PAUSING_STARTING_FEED,
    FEED_PAGINATION_TEXT: 'By default your feed is limited to 25 transactions per page, but this can optionally be set to 50 and 100. This along with various other controls to go to specific pages of your feed are accessible on the bar at the bottom of the feed window.',
    FEED_PAGINATION_MP4: FEED_PAGINATION,
    SORTING_SEARCHING_TEXT: 'The feed can be sorted by column and searched based on address, transaction hash, or block number. To sort, click on the header of the column you wish to sort by. To search, provide your desired search string to the field at the top of the feed window.',
    SORTING_SEARCHING_MP4: SORTING_SEARCHING,
    FEED_DATA_TEXT: 'Associated with each transaction the feed is a from address, to address, logs containing token transfer info if present, the total value in eth for the transaction, the timestamp and block number, and the hash. Data styling and audio alerts are rendered differently based on the total eth value of the transaction as well as token transfer info.',
    FEED_DATA_MP4: FEED_DATA,
    CHAT_TEXT: 'The Trollbox is a place for you to chat with other users, share news, and share memes. Your username in chat is the address you have connected.',
    CHAT_MP4: CHAT,
    SHARE_TEXT: 'To quickly share a transaction from your feed in chat, click the copy to feed button associated with the transaction you wish to share and send the message as normal. The message will automatically be formated and displayed with associated links and information.',
    SHARE_MP4: SHARE,
    BREAK_TEXT: 'Whenever you are tired of watching, you can take a break and play some Dos games in the Dosbox. To play a game, click on the button corresponsind to the game you wish to play.',
    BREAK_MP4: BREAK,
}

export default INFO_CONSTANTS;