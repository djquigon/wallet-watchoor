import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import FeedCSS from "../style/Feed.module.css";

/**
 * The FeedGlobaFilter component contains the search input field and 
 * keeps track of the current filter itself.
 * @param { filter,
  setFilter,
  currPageIndex,
  setCurrPageIndex, } props
 */
const FeedGlobalFilter = ({
  filter,
  setFilter,
  currPageIndex,
  setCurrPageIndex,
}) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  return (
    <span style={{ width: "70%" }}>
      <input
        id={FeedCSS.feedSearch}
        type="search"
        placeholder="Search by Address, Txn Hash, Block #, or Token Ticker"
        value={value || ""}
        onChange={(e) => {
          if (currPageIndex !== 0) {
            setCurrPageIndex(0);
          }
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default FeedGlobalFilter;
