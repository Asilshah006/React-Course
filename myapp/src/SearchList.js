import React from 'react'

const SearchList = ({search , setSearch}) => {
  return (
    <form action="" className='search' onSubmit={(e) => e.preventDefault}>
        <label htmlFor="search">
            Search
        </label>
        <input 
            id='search'
            type="text"
            role= "searchbox"
            placeholder='Search Item'
            value = {search}
            onChange = {(e) => setSearch(e.target.value)} />
    </form>

  )
}

export default SearchList