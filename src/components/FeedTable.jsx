import { useMemo, useState } from "react";
import React from "react";
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
import { IoMdPlay, IoMdPause, IoMdChatboxes } from "react-icons/io";
import { GiNuclearBomb } from "react-icons/gi";
import { GoMute, GoUnmute } from "react-icons/go";
import makeBlockie from "ethereum-blockies-base64";
import unknownLogo from "../assets/unknownlogo.png";
import FeedGlobalFilter from "./FeedGlobalFilter";
import ClipboardJS from "clipboard";
import ReactTooltip from "react-tooltip";
import axios from "axios";

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
  setTrollboxFormMessage,
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
              alt="avatar"
            ></img>
          ) : (
            <img
              className={FeedCSS.avatar}
              src={makeBlockie(value)}
              alt="avatar"
            ></img>
          )}
          {row.original.fromAddressInfo !== undefined &&
          row.original.fromAddressInfo &&
          row.original.fromAddressInfo.alias ? (
            <> ⭐{row.original.fromAddressInfo.alias} </>
          ) : (
            " "
          )}
          <br></br>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/address/${value}`}
          >
            {`${value.substring(0, 6)}...${value.substring(value.length - 4)}`}
          </a>{" "}
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
                  alt="avatar"
                ></img>
              ) : (
                <img
                  className={FeedCSS.avatar}
                  src={makeBlockie(value)}
                  alt="avatar"
                ></img>
              )}
              {row.original.toAddressInfo !== undefined &&
              row.original.toAddressInfo &&
              row.original.toAddressInfo.alias ? (
                <> ⭐{row.original.toAddressInfo.alias} </>
              ) : (
                " "
              )}
              <br></br>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://etherscan.io/address/${value}`}
              >
                {`${value.substring(0, 6)}...${value.substring(
                  value.length - 4
                )}`}
              </a>{" "}
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
            </>
          )}
        </>
      ),
    },
    {
      id: "logs",
      Header: "Logs",
      accessor: (row) => row.logs.map((log) => log.symbol),
      Cell: ({ value, row }) => (
        <span
          className={`${FeedCSS.logs} ${
            row.original.ethBuy
              ? "ethBuy"
              : row.original.ethSell
              ? "ethSell"
              : row.original.ethTransfer
              ? "ethTransfer"
              : row.original.usdBuy
              ? "usdBuy"
              : row.original.usdSell
              ? "usdSell"
              : row.original.usdTransfer
              ? "usdTransfer"
              : row.original.btcBuy
              ? "btcBuy"
              : row.original.btcSell
              ? "btcSell"
              : row.original.btcTransfer
              ? "btcTransfer"
              : ""
          } `}
        >
          {row.original.contractAddress ? (
            <span>
              <a
                href={`https://etherscan.io/address/${row.original.contractAddress}`}
              >
                {row.original.contractAddress}
              </a>
            </span>
          ) : null}
          {row.original.logs.map((log, index) => (
            //had to use full syntax here to add key
            <React.Fragment key={index}>
              {index > 0 ? <FaArrowRight color="inherit" /> : null}
              {log.failed ? (
                <span>
                  <p>
                    Failed to add this log, check etherscan txn hash link for
                    more details.
                  </p>
                </span>
              ) : log.tokenID ? (
                <span className={FeedCSS.nftLog}>
                  <span>
                    <p>
                      {log.event}{" "}
                      <strong>{`${log.name} (${log.symbol}) #${
                        log.tokenID.length > 5
                          ? log.tokenID.substring(0, 6) + "..."
                          : log.tokenID
                      }`}</strong>
                    </p>
                    <p>
                      From:{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
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
                        rel="noreferrer"
                        href={`https://etherscan.io/address/${log.to}`}
                      >{`${log.to.substring(0, 6)}...${log.to.substring(
                        log.to.length - 4
                      )}`}</a>
                    </p>
                  </span>
                  <ReactTooltip
                    id={`openseaLink${log.contractAddress}/${log.tokenID}/${index}`}
                    class="tooltip"
                  />
                  <span
                    data-for={`openseaLink${log.contractAddress}/${log.tokenID}/${index}`}
                    data-tip={`View ${log.name} #${
                      log.tokenID.length > 5
                        ? log.tokenID.substring(0, 6) + "..."
                        : log.tokenID
                    } on Opensea`}
                    style={{ display: "flex" }}
                  >
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://opensea.io/assets/ethereum/${log.contractAddress}/${log.tokenID}`}
                      style={{ marginLeft: "1em" }}
                    >
                      <img
                        className={FeedCSS.nftImage}
                        src={log.image}
                        alt="nft image"
                        onError={(img) => {
                          console.log(
                            `No nft image found for ${log.image}, setting default...`
                          );
                          img.target.onError = null;
                          img.target.src = unknownLogo;
                        }}
                      ></img>
                    </a>
                  </span>
                </span>
              ) : (
                <span>
                  <p>
                    {log.event}{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.coingecko.com/en/coins/${log.contractAddress}`}
                    >
                      <img
                        className={FeedCSS.tokenLogo}
                        src={`https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/${log.contractAddress}/logo.png`}
                        alt="token logo"
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
                      rel="noreferrer"
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
                      rel="noreferrer"
                      href={`https://etherscan.io/address/${log.to}`}
                    >{`${log.to.substring(0, 6)}...${log.to.substring(
                      log.to.length - 4
                    )}`}</a>
                  </p>
                </span>
              )}
            </React.Fragment>
          ))}
        </span>
      ),
      sortType: useMemo(
        () => (a, b) => {
          a = a.values.logs.length;
          b = b.values.logs.length;
          if (a === b) {
            return 0;
          }
          return a > b ? 1 : -1;
        },
        []
      ), // custom function
    },
    {
      Header: "Value",
      accessor: "value",
      Cell: ({ value }) => (
        <div
          className={`${value < 1 ? "normal" : ""}${
            value >= 1 && value < 10 ? "smallValue" : ""
          }${value >= 10 && value < 50 ? "mediumValue" : ""}${
            value >= 100 && value < 500 ? "largeValue" : ""
          }${value >= 500 && value < 1000 ? "massiveValue" : ""}${
            value >= 1000 && value <= 5000 ? "jesusValue" : ""
          }${value >= 5000 ? "holyshitValue" : ""}`}
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
          {row.original.timestamp.substring(10)}
          <br></br>
          <a
            href={`https://etherscan.io/block/${value}`}
            target="_blank"
            rel="noreferrer"
          >
            Block {row.original.blockNumber}
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
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/tx/${value}`}
          >
            {`${value.substring(0, 6)}...${value.substring(value.length - 4)}`}{" "}
          </a>
        </div>
      ),
    },
    {
      id: "copyDelete",
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
          <span className={FeedCSS.deleteCopyContainer}>
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
            <ReactTooltip
              id={`trollboxCopy${row.original.transactionHash}`}
              class="tooltip"
            />
            <button
              style={{ background: "none", border: "none", color: "inherit" }}
              data-place="left"
              data-for={`trollboxCopy${row.original.transactionHash}`}
              data-tip="Copy transaction to trollbox?"
              onClick={() => {
                const transactionMessage = `TRANSACTION = Hash: *{${row.original.transactionHash}}
                From: @{${row.original.from}}
                To: %{${row.original.to}}
                Logs: #${row.original.logs.length} tokens transferred^
                Value: $${row.original.value} Ξ
                Timestamp: !${row.original.timestamp}
              `;
                setTrollboxFormMessage(transactionMessage);
              }}
            >
              <IoMdChatboxes color="inherit" />
            </button>
          </span>
        </span>
      ),
      disableGlobalFilter: true,
    },
  ];

  //usemmemo ensures data isnt recreated on every render
  const data = useMemo(() => feedTransactions, [feedTransactions]);
  //placing data inside here fixed handleDelete issue, fixing the warning here creates a chain of other issues to fix, ignoring it...
  const columns = useMemo(() => COLUMNS, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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

  new ClipboardJS(".copyBtn");

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
            {page.map((row) => {
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
            })}
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
