import {useMemo} from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import FeedCSS from '../style/Feed.module.css'
import {FaTrashAlt} from "react-icons/fa";
import makeBlockie from 'ethereum-blockies-base64';
import etherscanLogo from "../assets/etherscanlogo.png"
import FeedGlobalFilter from './FeedGlobalFilter';

//GO BACK AND COMMENT THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

const FeedTable = ({feedTransactions, setFeedTransactions}) => {

const handleDelete = (hash) => {
    console.log(hash)
    const newFeedTransactions = feedTransactions.filter(transaction => transaction.hash !== hash)
    console.log("here", feedTransactions)
    setFeedTransactions(newFeedTransactions)
}
    
const COLUMNS = [
    {
        Header: "From",
        accessor: "from",
        Cell: ({value, row}) => (
            <>
                {/* can take this out if i dont allow alias to be null */}
                {row.original.fromAddressInfo !== undefined 
                && row.original.fromAddressInfo 
                && row.original.fromAddressInfo.avatar ? 
                <img className={FeedCSS.avatar} src={row.original.fromAddressInfo.avatar}></img> 
                : <img className={FeedCSS.avatar} src={makeBlockie(value)}></img>}
                
                {row.original.fromAddressInfo !== undefined 
                && row.original.fromAddressInfo 
                && row.original.fromAddressInfo.alias ?  
                ` ⭐${row.original.fromAddressInfo.alias} ` : " "}
                <br></br><a target="_blank" href={`https://etherscan.io/address/${value}`}>{`${value.substring(0, 6)}...${value.substring(value.length - 4)}`} <img height="14px" src={etherscanLogo}></img></a>
            </>
        )
    },
    {
        Header: "To",
        accessor: "to",
        Cell: ({value, row}) => (
            <>
            {!value ? <b style={{color: "gold"}}>Contract Creation</b> :
                <>
                    {row.original.toAddressInfo !== undefined 
                    && row.original.toAddressInfo 
                    && row.original.toAddressInfo.avatar ? 
                    <img className={FeedCSS.avatar} src={row.original.toAddressInfo.avatar}></img> 
                    : <img className={FeedCSS.avatar} src={makeBlockie(value)}></img>}
                    
                    {row.original.toAddressInfo !== undefined 
                    && row.original.toAddressInfo 
                    && row.original.toAddressInfo.alias ?  
                    ` ⭐${row.original.toAddressInfo.alias} ` : " "}
                    <br></br><a target="_blank" href={`https://etherscan.io/address/${value}`}>{`${value.substring(0, 6)}...${value.substring(value.length - 4)}`} <img height="14px" src={etherscanLogo}></img></a>
                </>
            }
            </>
        )
    },
    {
        Header: "Method",
        accessor: "confirmations",
        Cell: cellInfo => (
            <p>Atomic Match_</p>
        )
    },
    {
        Header: "Value",
        accessor: "value",
        Cell: ({value}) => (
            <div className={`${value >= 1 && value <= 10 ? "smallValue" : ""}${value >= 10 && value <= 50 ? "mediumValue" : ""}${value >= 50 && value <= 100 ? "largeValue" : ""}${value >= 100 && value <= 500 ? "largeValue" : ""}${value >= 500 && value <= 1000 ? "largeValue" : ""}`}>
                <b>{value} Ξ</b>
            </div>
        )
    },
    {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: ({value, row}) => (
            <p> 
                {new Date(value*1000).toLocaleTimeString("en-US")} EST 
                <br></br><a href={`https://etherscan.io/block/${row.original.blockNumber}`} target="_blank">Block {row.original.blockNumber}</a> 
                <img height="14px" src={etherscanLogo}></img>
            </p>
        )
    },
    {
        Header: "Txn Hash",
        accessor: "hash",
        Cell: ({value, row}) => (
            <div className={`${row.original.creates ? "contractCreation" : ""}`}>
                <a target="_blank" href={`https://etherscan.io/tx/${value}`}>
                    {`${value.substring(0, 6)}...${value.substring(value.length - 4)}`} <img height="14px" src={etherscanLogo}></img>
                </a>
            </div>
        )
    },
    {
        id: "delete",
        Header: ({data}) => (
            <p>Total Txns: <b style={{color: "#00ca00"}}>{data.length}</b></p>
        ),
        accessor: "chainId",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({row}) => (
            <div style={{textAlign: "right"}}><FaTrashAlt role="button" onClick={() => handleDelete(row.original.hash)}/></div>
        )
    }
]

    //usemmemo ensures data isnt recreated on every render
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => feedTransactions, [feedTransactions])

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
    } = useTable({
        columns: columns,
        data: data,
        initialState: { pageSize: 25 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <>
            <FeedGlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} id={FeedCSS.headerRow}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ⬆️' : ' ⬇️') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className={FeedCSS.feedRow}>
                                    {row.cells.map((cell) => {
                                            return <td{...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                    <span>
                        Page {' '}
                        <strong>{pageIndex+1} of {pageOptions.length}</strong>{' '}
                    </span>
                    <span>
                        | Go to page: {' '}
                        <input type='number' defaultValue={pageIndex + 1} 
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} style={{width: '50px'}}/>
                    </span>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {[25, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Prev</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    )
}

export default FeedTable