import WELCOME from "./assets/info/WELCOME.gif";
import ADDING_ADDRESS from "./assets/info/ADDING_ADDRESS.gif";
import DELETING_ADDRESS from "./assets/info/DELETING_ADDRESS.gif";
import SEARCHING_ADDRESS from "./assets/info/SEARCHING_ADDRESS.gif";
import WATCHLIST_ADDRESS_DATA from "./assets/info/WATCHLIST_ADDRESS_DATA.gif";
import VIEWING_TRANSACTIONS from "./assets/info/VIEWING_TRANSACTIONS.gif";
import DELETING_TRANSACTIONS from "./assets/info/DELETING_TRANSACTIONS.gif";
import PAUSING_STARTING_FEED from "./assets/info/PAUSING_STARTING_FEED.gif";
import FEED_PAGINATION from "./assets/info/FEED_PAGINATION.gif";
import SORTING_SEARCHING from "./assets/info/SORTING_SEARCHING.gif";
import FEED_DATA from "./assets/info/FEED_DATA.gif";
import CHAT from "./assets/info/CHAT.gif";
import SHARE from "./assets/info/SHARE.gif";
import BREAK from "./assets/info/BREAK.gif";
import FUN from "./assets/info/FUN.gif";

const INFO_CONSTANTS = {
    WELCOME_TEXT: 'Welcome to the Wallet Watchoor™ handbook. Wallet Watchoor is a dashboard for Ethereum and other EVM based chains, where you can view transactions from addresses you have followed. All that is required is a web3 wallet provider such as Metamask installed on your browser, which I assume you have because well why else would you be here. Your feed periodically updates every 15 seconds with new transactions from your watched addresses if any were detected. While you are watching™, you can chat with fellow watchoors in the Trollbox — a horrible knockoff of the bitmex™ trollbox. Along with chatting, you can share transactions from your feed to keep other watchoors informed. There is also an optional Dosbox window you can open where you can play classic Dos games if you get bored. That about sums up the general functionality of this site. For more specific info and guidance, click on the more specific topics listed on the left.',
    WELCOME_GIF: WELCOME,
    DASHBOARD_BASICS_TEXT: 'As described in the "Welcome" section, the dashboard consists of four main components: the Feed, Watchlist, Trollbox, and Dosbox. Each components size is adjustable via the resizing handle and their position is adjustable by simply dragging and dropping. There are certain limitations to the formatting, but for the most part you can orient each component in any way you want.',
    DASHBOARD_BASICS_GIF: WELCOME,
    ADDING_ADDRESS_TEXT: 'Adding an address to your watchlist ensures in the future all transactions sent to or from said address are populated into your feed. To do so, type a valid ens or ethereum address as well as an alias you wish to give to the address in the two fields at the top of the watchlist. Once added the address will appear at the end of your list.',
    ADDING_ADDRESS_GIF: ADDING_ADDRESS,
    DELETING_ADDRESS_TEXT: 'Deleting an address from your watchlist ensures transactions to or from the previously saved address are no longer tracked in your feed. To do so, click on the trash can icon associated with the address you wish to delete. This action is irreversable, though you can simply add an address back if doing so was unintended. You can also mute an address if you simply wish to longer see their transactions in your feed, but do not want to fully remove it from your list. To do this click on the volume icon opposite the delete button associated with the address you wish to mute.',
    DELETING_ADDRESS_GIF: DELETING_ADDRESS,
    SEARCHING_ADDRESS_TEXT: 'Searching for an address in your watchlist may become imperative when it begins to fill up with addresses. To do so, type the alias and address or ens associated with the address you wish to find into the search field below the two add address fields. The watchlist will the be filtered based on your search and then displayed.',
    SEARCHING_ADDRESS_GIF: SEARCHING_ADDRESS,
    WATCHLIST_ADDRESS_DATA_TEXT: 'Associated with each address in your watchlist are various links and information retreived from EIP-634 ens text records associated with an ens address. For this information to appear an address must have an associated ens name as well as set these text records. These records include an avatar, an email, a location, a website url, a twitter username, and a telegram username.',
    WATCHLIST_ADDRESS_DATA_GIF: WATCHLIST_ADDRESS_DATA,
    VIEWING_TRANSACTIONS_TEXT: 'Once you have at least one address added to your watchlist, transactions to or from these addresses will begin populating in your feed as they occur. New transactions and their associated information appear at the top of your feed are marked with "! New". These are retrieved after every refresh, which occur every 15 second interval.',
    VIEWING_TRANSACTIONS_GIF: VIEWING_TRANSACTIONS,
    DELETING_TRANSACTIONS_TEXT: 'Deleting a transaction from your feed can be done by clicking the trash can icon associated with the transaction you wish to delete. This action is irreversable.  Clearing your feed removes every transaction in one command and is also irreversable. It can be done by clicking the bomb icon at the top right of the feed window.',
    DELETING_TRANSACTIONS_GIF: DELETING_TRANSACTIONS,
    PAUSING_STARTING_FEED_TEXT: 'By default your feed is unpaused and detecting transactions to or from your watchlist addresses. Optionally, you can pause your feed to no longer listen for any transactions to add by pressing the button to the left of the clear feed icon. Your feed will stay unchanged in this state, and can be unpaused by clicking the icon once again.',
    PAUSING_STARTING_FEED_GIF: PAUSING_STARTING_FEED,
    FEED_PAGINATION_TEXT: 'By default your feed is limited to 25 transactions per page, but this can optionally be set to 50 and 100. This along with various other controls to go to specific pages of your feed are accessible on the bar at the bottom of the feed window.',
    FEED_PAGINATION_GIF: FEED_PAGINATION,
    SORTING_SEARCHING_TEXT: 'The feed can be sorted by column and searched based on address, transaction hash, or block number. To sort, click on the header of the column you wish to sort by. To search, provide your desired search string to the field at the top of the feed window.',
    SORTING_SEARCHING_GIF: SORTING_SEARCHING,
    FEED_DATA_TEXT: 'Associated with each transaction the feed is a from address, to address, decoded logs, the total value in eth for the transaction, the timestamp and block number, and the hash.',
    FEED_DATA_GIF: FEED_DATA,
    CHAT_TEXT: 'The Trollbox is a place for you to chat with other users, share news, and share memes. Your username in chat is the address you have connected.',
    CHAT_GIF: CHAT,
    SHARE_TEXT: 'To quickly share a transaction from your feed in chat, type "/$" followed by the hash of the transaction you wish to share. e.g. /$0xa87d...  ',
    SHARE_GIF: SHARE,
    BREAK_TEXT: 'Whenever you are tired of watching, you can take a break and play some Dos games in the Dosbox.',
    BREAK_GIF: BREAK,
    FUN_TEXT: 'To play a game, click on the button corresponsind to the game you wish to play.',
    FUN_GIF: FUN,
}

export default INFO_CONSTANTS;