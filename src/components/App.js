
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  let [inputStr,setInputStr] = useState("")
  let [arr,setArr] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  async function handleSearch(){
    setHasSearched(true)
    try {
      let res = await fetch(`https://www.omdbapi.com/?s=${inputStr}&apikey=99eb9fd1`)
      let data= await res.json()
      if(data.Search){
        setArr(data.Search)
      }
      else{
        setArr([])
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  function handleStr(e){
    setInputStr(e=>e.target.value)
  }
  return (
    <div>
        {/* Do not remove the main div */}
        <p>Search Movie</p>
        <input type="text" onChange={handleStr} value={inputStr} />
        <button onClick={handleSearch}>Search</button>
        <ul>
        {arr.length > 0 ? (
          arr.map((movie, index) => (
            <li key={index}>
              <p>{movie.Title}({movie.Year})</p>
              <img src={movie.Poster} />
            </li>
          ))
        ) : (
          hasSearched && <p>Invalid movie name. Please try again.</p> 
        )}
      </ul>
    </div>
  )
}

export default App
