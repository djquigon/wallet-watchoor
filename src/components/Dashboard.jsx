import React from "react";
import { useState } from "react";
import DashboardCSS from "../style/Dashboard.module.css";
import ChainNav from "./ChainNav";
import Feed from "./Feed";
import WatchList from "./WatchList";
import Trollbox from "./Trollbox";
import Dosbox from "./Dosbox";
import RGL, { WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

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

const Dashboard = ({ account, handleAccount }) => {
  const [addresses, setAddresses] = useState([]);
  const [block, setBlock] = useState(null);
  const [layout, setLayout] = useState(
    JSON.parse(JSON.stringify(originalLayout))
  );

  const onLayoutChange = (layout) => {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    setLayout(layout);
  };

  return (
    <main style={{ alignItems: "unset" }}>
      <ChainNav
        block={block}
        setBlock={setBlock}
        account={account}
        handleAccount={handleAccount}
      />
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={20}
        rowHeight={10}
        allowOverlap={false}
        margin={[5, 5]}
        onLayoutChange={onLayoutChange}
      >
        <div
          key="Feed"
          data-grid={{ x: 0, y: 0, w: 12, h: 68, minW: 8, minH: 7 }}
        >
          <Feed block={block} account={account} addresses={addresses} />
        </div>
        <div
          key="Watchlist"
          data-grid={{ x: 12, y: 0, w: 4, h: 34, minW: 3, minH: 7, maxH: 68 }}
        >
          <WatchList
            account={account}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </div>
        <div
          key="Trollbox"
          data-grid={{
            x: 16,
            y: 0,
            w: 4,
            h: 34,
            maxW: 5,
            minW: 3,
            minH: 7,
            maxH: 68,
          }}
        >
          <Trollbox account={account} />
        </div>
        <div
          key="Dosbox"
          data-grid={{ x: 12, y: 68, w: 8, h: 34, minW: 5, minH: 20 }}
        >
          <Dosbox />
        </div>
      </ReactGridLayout>
    </main>
  );
};

export default Dashboard;
