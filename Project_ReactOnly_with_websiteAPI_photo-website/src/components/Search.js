import React, { useState } from 'react'
import { createClient } from 'pexels';

const Search = ({search,another_search,setInput}) => {
  const Inputhandler = (e) =>{
    // console.log(e.target.value);
    setInput(e.target.value)
  }
   
  return (
    <div className = "Search">
        <input onChange ={Inputhandler}/>
        <button onClick={search}>Search</button>
        <button onClick={another_search}>another_Search</button>
    </div>
  )
}

export default Search