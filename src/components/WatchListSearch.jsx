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
        type="text"
        role="searchbox"
        placeholder="Search Watch List"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default WatchListSearch;
