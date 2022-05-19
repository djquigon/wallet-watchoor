import React from 'react'
import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import FeedCSS from '../style/Feed.module.css'

const FeedGlobalFilter = ({filter, setFilter, currPageIndex, setCurrPageIndex}) => {

  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 300)


  return (
    <span style={{width: "30%"}}>
        <input id={FeedCSS.feedSearch} 
        placeholder="Search Address, Txn Hash, or Block #" 
        value={value || ''}
        onChange={(e) => {
          if(currPageIndex !== 0 ){setCurrPageIndex(0)}
          setValue(e.target.value)
          onChange(e.target.value)
        }}/>
    </span>
  )
}

export default FeedGlobalFilter