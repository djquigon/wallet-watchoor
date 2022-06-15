import React from "react";
import WatchListCSS from "../style/WatchList.module.css";

const WatchListSearch = ({ search, setSearch }) => {
  return (
    <form
      className={WatchListCSS.searchForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        role="searchbox"
        placeholder="Search Watchlist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default WatchListSearch;
