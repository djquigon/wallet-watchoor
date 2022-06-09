import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import FeedCSS from "../style/Feed.module.css";
import "../style/FeedRow.css";
import {
  FaTrashAlt,
  FaExclamation,
  FaCopy,
  FaArrowRight,
} from "react-icons/fa";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { GiNuclearBomb } from "react-icons/gi";
import { GoMute, GoUnmute } from "react-icons/go";
import makeBlockie from "ethereum-blockies-base64";
import etherscanLogo from "../assets/etherscanlogo.png";
import unknownLogo from "../assets/unknownlogo.png";
import FeedGlobalFilter from "./FeedGlobalFilter";
import ClipboardJS from "clipboard";
import ReactTooltip from "react-tooltip";
import axios from "axios";

//GO BACK AND COMMENT THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

const getLogoFromCoinGecko = async (img, contractAddress) => {
  console.log("getLogoFromCoinGecko...");
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
    );
    img.target.onError = null;
    img.target.src = res.data.image.thumb;
  } catch (e) {
    console.log("No token logo found, setting default...");
    img.target.onError = null;
    img.target.src = unknownLogo;
  }
};

const FeedTable = ({
  account,
  isPaused,
  setIsPaused,
  isMuted,
  setIsMuted,
  feedTransactions,
  setFeedTransactions,
  currBlockNum,
  prevBlockNum,
}) => {
  const COLUMNS = [
    {
      Header: "From",
      accessor: "from",
      Cell: ({ value, row }) => (
        <>
          {/* can take this out if i dont allow alias to be null */}
          {row.original.fromAddressInfo !== undefined &&
          row.original.fromAddressInfo &&
          row.original.fromAddressInfo.avatar ? (
            <img
              className={FeedCSS.avatar}
              src={row.original.fromAddressInfo.avatar}
            ></img>
          ) : (
            <img className={FeedCSS.avatar} src={makeBlockie(value)}></img>
          )}

          {row.original.fromAddressInfo !== undefined &&
          row.original.fromAddressInfo &&
          row.original.fromAddressInfo.alias ? (
            <> ⭐{row.original.fromAddressInfo.alias} </>
          ) : (
            " "
          )}
          <ReactTooltip id={value} class="tooltip" globalEventOff="click" />
          <FaCopy
            data-for={value}
            data-effect="solid"
            data-tip="Copy address"
            className="copyBtn"
            data-clipboard-text={value}
            color="inherit"
            role="button"
          />
          <br></br>
          <a target="_blank" href={`https://etherscan.io/address/${value}`}>
            {`${value.substring(0, 6)}...${value.substring(value.length - 4)}`}{" "}
            <img height="14px" src={etherscanLogo}></img>
          </a>
        </>
      ),
    },
    {
      Header: "To",
      accessor: "to",
      Cell: ({ value, row }) => (
        <>
          {!value ? (
            <b style={{ color: "gold" }}>Contract Creation</b>
          ) : (
            <>
              {row.original.toAddressInfo !== undefined &&
              row.original.toAddressInfo &&
              row.original.toAddressInfo.avatar ? (
                <img
                  className={FeedCSS.avatar}
                  src={row.original.toAddressInfo.avatar}
                ></img>
              ) : (
                <img className={FeedCSS.avatar} src={makeBlockie(value)}></img>
              )}

              {row.original.toAddressInfo !== undefined &&
              row.original.toAddressInfo &&
              row.original.toAddressInfo.alias ? (
                <> ⭐{row.original.toAddressInfo.alias} </>
              ) : (
                " "
              )}
              <ReactTooltip id={value} class="tooltip" globalEventOff="click" />
              <FaCopy
                data-for={value}
                data-effect="solid"
                data-tip="Copy address"
                className="copyBtn"
                data-clipboard-text={value}
                color="inherit"
                role="button"
              />
              <br></br>
              <a target="_blank" href={`https://etherscan.io/address/${value}`}>
                {`${value.substring(0, 6)}...${value.substring(
                  value.length - 4
                )}`}{" "}
                <img height="14px" src={etherscanLogo}></img>
              </a>
            </>
          )}
        </>
      ),
    },
    {
      Header: "Logs",
      accessor: "logs",
      Cell: ({ value }) => (
        <span
          className={`${FeedCSS.logs} ${
            value.length > 1 &&
            value[0].symbol.toUpperCase().includes("USD") &&
            value[0].value < 1000000
              ? "pompeet"
              : value.length > 1 &&
                value[value.length - 1].symbol.toUpperCase().includes("USD") &&
                value[value.length - 1].value < 1000000
              ? "dompeet"
              : ""
          } `}
        >
          {value.map((log, index) => (
            <>
              {index > 0 ? <FaArrowRight color="inherit" /> : null}
              <span key={index}>
                <p>
                  {log.event}{" "}
                  <a
                    target="_blank"
                    href={`https://www.coingecko.com/en/coins/${log.contractAddress}`}
                  >
                    <img
                      className={FeedCSS.tokenLogo}
                      src={`https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/${log.contractAddress}/logo.png`}
                      onError={(img) => {
                        getLogoFromCoinGecko(img, log.contractAddress);
                      }}
                    ></img>
                  </a>{" "}
                  <strong>
                    {log.value} {log.symbol}
                  </strong>
                </p>
                <p>
                  From:{" "}
                  <a
                    target="_blank"
                    href={`https://etherscan.io/address/${log.from}`}
                  >{`${log.from.substring(0, 6)}...${log.from.substring(
                    log.from.length - 4
                  )}`}</a>{" "}
                </p>
                <p>
                  {" "}
                  To:{" "}
                  <a
                    target="_blank"
                    href={`https://etherscan.io/address/${log.to}`}
                  >{`${log.to.substring(0, 6)}...${log.to.substring(
                    log.to.length - 4
                  )}`}</a>
                </p>
              </span>
            </>
          ))}
        </span>
      ),
    },
    {
      Header: "Value",
      accessor: "value",
      Cell: ({ value }) => (
        <div
          className={`${value < 1 ? "normal" : ""}${
            value >= 1 && value < 10 ? "smallValue" : ""
          }${value >= 10 && value < 50 ? "mediumValue" : ""}${
            value >= 50 && value < 100 ? "largeValue" : ""
          }${value >= 100 && value < 500 ? "massiveValue" : ""}${
            value >= 500 && value <= 1000 ? "jesusValue" : ""
          }${value >= 1000 ? "holyshitValue" : ""}`}
        >
          <h2 style={{ textAlign: "center" }}>{value} Ξ</h2>
        </div>
      ),
      disableGlobalFilter: true,
    },
    {
      Header: "Timestamp",
      accessor: "blockNumber",
      Cell: ({ value, row }) => (
        <p>
          {new Date(row.original.timestamp * 1000).toLocaleTimeString("en-US")}{" "}
          EST
          <br></br>
          <a href={`https://etherscan.io/block/${value}`} target="_blank">
            Block {row.original.blockNumber}{" "}
            <img height="14px" src={etherscanLogo}></img>
          </a>
        </p>
      ),
    },
    {
      Header: "Txn Hash",
      accessor: "transactionHash",
      Cell: ({ value, row }) => (
        <div
          className={`${
            row.original.contractAddress ? "contractCreation" : ""
          }`}
        >
          <a target="_blank" href={`https://etherscan.io/tx/${value}`}>
            {`${value.substring(0, 6)}...${value.substring(value.length - 4)}`}{" "}
            <img height="14px" src={etherscanLogo}></img>
          </a>
        </div>
      ),
    },
    {
      id: "delete",
      Header: ({ data }) => (
        <p>
          Total Txns: <b style={{ color: "#00ca00" }}>{data.length}</b>
        </p>
      ),
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <span className={FeedCSS.deleteCell}>
          {row.original.blockNumber > prevBlockNum &&
          row.original.blockNumber <= currBlockNum ? (
            <h3 style={{ color: "#00ca00" }}>
              <FaExclamation color="#00ca00" /> new
            </h3>
          ) : (
            <p></p>
          )}
          <div style={{ textAlign: "right" }}>
            <FaTrashAlt
              role="button"
              onClick={() => {
                //handleDelete
                let newFeedTransactions = feedTransactions;
                newFeedTransactions = newFeedTransactions.filter(
                  (transaction) =>
                    transaction.transactionHash !== row.original.transactionHash
                );
                setFeedTransactions(newFeedTransactions);
              }}
            />
          </div>
        </span>
      ),
      disableGlobalFilter: true,
    },
  ];

  //usemmemo ensures data isnt recreated on every render
  const data = useMemo(() => feedTransactions, [feedTransactions]);
  //placing data inside here fixed handleDelete issue, why?
  const columns = useMemo(() => COLUMNS, [data]);

  /**Ensures pageIndex isnt reset every time feed is updated */
  const [currPageIndex, setCurrPageIndex] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageSize: 25, pageIndex: currPageIndex },
      autoResetGlobalFilter: false,
      autoResetSortBy: false,
      //autoresetpage did not work for my implementation
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  let clipboard = new ClipboardJS(".copyBtn");

  return (
    <>
      {/* script for copy to clipboard */}
      <script src="https://unpkg.com/clipboard@2/dist/clipboard.min.js"></script>
      <div id={FeedCSS.tableOptions}>
        <FeedGlobalFilter
          filter={globalFilter}
          currPageIndex={currPageIndex}
          setFilter={setGlobalFilter}
          setCurrPageIndex={setCurrPageIndex}
        />
        <span>
          <ReactTooltip class="tooltip" id="setMuted" />
          <span
            data-place="left"
            data-tip={
              isMuted
                ? "Feed muted. Click to unmute."
                : "Feed unmuted. Click to mute."
            }
            data-for="setPaused"
          >
            {isMuted ? (
              <GoMute
                color="Red"
                role="button"
                onClick={() => setIsMuted(!isMuted)}
              />
            ) : (
              <GoUnmute
                color="#00ac31"
                role="button"
                onClick={() => setIsMuted(!isMuted)}
              />
            )}
          </span>
          <ReactTooltip class="tooltip" id="setPaused" />
          <span
            data-place="left"
            data-tip={
              isPaused
                ? "Feed paused. Click to unpause."
                : "Feed unpaused. Click to pause."
            }
            data-for="setPaused"
          >
            {isPaused ? (
              <IoMdPause
                color="red"
                role="button"
                onClick={() => setIsPaused(!isPaused)}
              />
            ) : (
              <IoMdPlay
                color="#00ac31"
                role="button"
                onClick={() => setIsPaused(!isPaused)}
              />
            )}
          </span>
          <ReactTooltip class="tooltip" id="clear" />
          <span data-for="clear" data-tip="Clear feed?" data-place="left">
            <GiNuclearBomb
              onClick={() => {
                if (feedTransactions.length > 0) {
                  setFeedTransactions([]);
                }
              }}
            />
          </span>
        </span>
      </div>
      <div id={FeedCSS.tableContainer}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} id={FeedCSS.headerRow}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {!account ? (
              <tr
                id={FeedCSS.walletWarning}
                style={{ backgroundColor: "transparent" }}
              >
                <td colSpan="7">
                  <p>Your wallet is not connected.</p>
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.original.hash}
                    {...row.getRowProps()}
                    className={FeedCSS.feedRow}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div id={FeedCSS.pageOptions}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length > 0 ? pageOptions.length : 1}{" "}
            |
          </strong>
        </span>
        <span>
          &nbsp;Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            min="1"
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setCurrPageIndex(0);
            gotoPage(0);
          }}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          onClick={() => {
            setCurrPageIndex(pageIndex - 1);
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setCurrPageIndex(pageIndex + 1);
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          onClick={() => {
            setCurrPageIndex(pageCount - 1);
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default FeedTable;
