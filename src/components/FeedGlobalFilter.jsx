import React from 'react'
import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

const FeedGlobalFilter = ({filter, setFilter}) => {

  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 300)


  return (
    <span>
        Search: <input style={{borderRadius: "12px"}} 
        placeholder="Address or Txn Hash" 
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}/>
    </span>
  )
}

export default FeedGlobalFilter