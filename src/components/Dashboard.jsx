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

const Dashboard = ({ account, handleAccount }) => {
  const [addresses, setAddresses] = useState([]);
  const [block, setBlock] = useState(null);
  const layout = [
    { i: "Feed", x: 0, y: 0, w: 12, h: 68, minW: 2 },
    { i: "Watchlist", x: 12, y: 0, w: 4, h: 34 },
    { i: "Trollbox", x: 16, y: 0, w: 4, h: 34, maxW: 4 },
    { i: "Dosbox", x: 12, y: 68, w: 8, h: 34 },
  ];

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
      >
        <div key="Feed">
          <Feed block={block} account={account} addresses={addresses} />
        </div>
        <div key="Watchlist">
          <WatchList
            account={account}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </div>
        <div key="Trollbox">
          <Trollbox account={account} />
        </div>
        <div key="Dosbox">
          <Dosbox />
        </div>
      </ReactGridLayout>
    </main>
  );
};

export default Dashboard;
