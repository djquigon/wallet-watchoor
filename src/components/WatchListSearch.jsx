import WatchListCSS from "../style/WatchList.module.css";

/**
 * The WatchListSearch component contains the search input field for finding addresses in a watchlist.
 * @param { search, setSearch } props
 */
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
