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
    <span>
        <input id={FeedCSS.feedSearch} 
        placeholder="Search Address or Txn Hash" 
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