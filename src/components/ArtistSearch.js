import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const ArtistSearch = () => {

  const [search, updateSearch] = useState('')
  const [info, updateInfo] = useState([])

  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${search}`)
      updateInfo(data.data)
    }
    fetchData()
  }, [search])

  const [input, updateInput] = useState('')

  if (info === undefined) {

    return <>
      <div className="searchflex">
        <input className="search-input" placeholder="Search artist or band name..." onChange={(event) => updateInput(event.target.value)}/>
        <button className="search-button" onClick={() => updateSearch(input)}>Search</button>
      </div>
    </>
  }

  return <>
    <div className="searchflex">
      <input className="search-input" placeholder="Search artist or band name..." onChange={(event) => updateInput(event.target.value)}/>
      <button className="search-button" onClick={() => updateSearch(input)}>Search</button>
    </div>
    <div className="search-results">
      {info.slice(0, 5).map((result, i) => {
        return <div key={i} className="search-result">
          <img className='search-pics' src={result.picture} />
          <h1 className="search-header">
            <Link to={`charts/${result.name}/${result.id}`}>
              {result.name}
            </Link>
          </h1>
        </div>
      })}
    </div>


  </>
}

export default ArtistSearch