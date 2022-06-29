import { useContext, useState } from "react";
import ChainNav from "./ChainNav";
import Feed from "./Feed";
import WatchList from "./WatchList";
import Trollbox from "./Trollbox";
import Dosbox from "./Dosbox";
import RGL, { WidthProvider } from "react-grid-layout";
import { AppContext } from "../App";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);
const defaultLayout = [
  {
    i: "Feed",
    x: 0,
    y: 0,
    w: 24,
    h: 68,
    minW: 16,
    minH: 14,
    maxW: 40,
    static: false,
  },
  {
    i: "Watchlist",
    x: 24,
    y: 0,
    w: 8,
    h: 68,
    minW: 6,
    minH: 7,
    maxH: 88,
    maxW: 15,
    static: false,
  },
  {
    i: "Trollbox",
    x: 32,
    y: 0,
    w: 8,
    h: 68,
    minW: 6,
    minH: 7,
    maxH: 88,
    maxW: 15,
    static: false,
  },
];
const originalLayout = getFromLS("layout") || defaultLayout;

function getFromLS(key) {
  let ls = {};
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  console.log("get from LS", ls[key]);
  return ls[key];
}

function saveToLS(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

const Dashboard = () => {
  const { database, chainID, account, setAccount } = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);
  const [block, setBlock] = useState(null);
  const [layout, setLayout] = useState(
    JSON.parse(JSON.stringify(originalLayout))
  );
  const [trollboxFormMessage, setTrollboxFormMessage] = useState("");

  const onLayoutChange = (layout) => {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    setLayout(layout);
  };

  const removeItem = (window) => {
    console.log("Removing " + window);
    setLayout(layout.filter((item) => item.i !== window));
  };

  const addItem = (newItem) => {
    const itemExists = layout.filter((item) => item.i === newItem).length > 0;
    if (itemExists) {
      console.log(newItem + " already in grid. Not adding.");
      return;
    } else {
      console.log("Adding " + newItem);
      newItem =
        newItem === "Watchlist"
          ? {
              i: newItem,
              x: 0,
              y: Infinity,
              w: 8,
              h: 34,
              minW: 6,
              minH: 7,
              maxH: 88,
              maxW: 15,
              static: false,
            }
          : newItem === "Trollbox"
          ? {
              i: newItem,
              x: 0,
              y: Infinity,
              w: 8,
              h: 34,
              minW: 6,
              minH: 7,
              maxH: 88,
              maxW: 15,
              static: false,
            }
          : newItem === "Dosbox"
          ? {
              i: newItem,
              x: 0,
              y: Infinity,
              w: 16,
              h: 34,
              minW: 10,
              minH: 20,
              maxH: 88,
              maxW: 40,
              static: false,
            }
          : null;
      const newLayout = layout.concat(newItem);
      setLayout(newLayout);
    }
  };

  const setItemStatic = (window) => {
    console.log("Setting static:  " + window);
    console.log(layout);
    const newLayout = layout.map((item) =>
      item.i === window ? { ...item, static: !item.static } : item
    );
    setLayout(newLayout);
  };

  const isItemStatic = (window) => {
    return layout.some((item) => item.i === window && item.static === true);
  };

  return (
    <main style={{ alignItems: "unset", overflowX: "hidden" }}>
      <ChainNav
        block={block}
        setBlock={setBlock}
        account={account}
        setAccount={setAccount}
      />
      {chainID === 1 ? (
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={40}
          rowHeight={10}
          allowOverlap={false}
          margin={[5, 5]}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((item) =>
            item.i === "Feed" ? (
              <div key={item.i} data-grid={{ item }}>
                <Feed
                  block={block}
                  account={account}
                  addresses={addresses}
                  setAddresses={setAddresses}
                  removeItem={removeItem}
                  addItem={addItem}
                  isItemStatic={isItemStatic}
                  setItemStatic={setItemStatic}
                  setTrollboxFormMessage={setTrollboxFormMessage}
                />
              </div>
            ) : item.i === "Watchlist" ? (
              <div key={item.i} data-grid={{ item }}>
                <WatchList
                  database={database}
                  account={account}
                  addresses={addresses}
                  setAddresses={setAddresses}
                  removeItem={removeItem}
                  addItem={addItem}
                  isItemStatic={isItemStatic}
                  setItemStatic={setItemStatic}
                />
              </div>
            ) : item.i === "Trollbox" ? (
              <div key={item.i} data-grid={{ item }}>
                <Trollbox
                  database={database}
                  account={account}
                  removeItem={removeItem}
                  addItem={addItem}
                  isItemStatic={isItemStatic}
                  setItemStatic={setItemStatic}
                  trollboxFormMessage={trollboxFormMessage}
                  setTrollboxFormMessage={setTrollboxFormMessage}
                />
              </div>
            ) : item.i === "Dosbox" ? (
              <div key={item.i} data-grid={{ item }}>
                <Dosbox
                  removeItem={removeItem}
                  addItem={addItem}
                  isItemStatic={isItemStatic}
                  setItemStatic={setItemStatic}
                />
              </div>
            ) : null
          )}
        </ReactGridLayout>
      ) : (
        <h2 style={{ textAlign: "center", margin: "10% 30%" }}>
          Wallet Watchoor is currently not available on this chain.
          <br />
          Switch chains to the Ethereum Mainnet to continue to the app.
        </h2>
      )}
    </main>
  );
};

export default Dashboard;
