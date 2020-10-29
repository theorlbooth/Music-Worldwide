import React, { useEffect, useState } from 'react'
import Loader from './Loader'
// import artistNews from './NewsObject'
import axios from 'axios'


const Artist = (props) => {

  const [artistNews, setArtistNews] = useState([])
  const [artistInfo, setArtistInfo] = useState([])
  const [deezerInfo, setDeezerInfo] = useState({})

  const artistName = props.match.params.artistName
  const artistID = props.match.params.artistID



  useEffect(() => {
    async function fetchNews() {
      const { data: dataInfo } = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=eb5fccc68a5fd50a780b1973c7310ad3&format=json`)
      setArtistInfo(dataInfo.artist)
      const { data: artistImage } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistID}`)
      setDeezerInfo(artistImage)
      const { data: dataNews } = await axios.get(
        `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=${artistName}&count=10&offset=0&mkt=en-us&safeSearch=Moderate`, {
        headers: {
          'Ocp-Apim-Subscription-Key': '6ccba96991d845f3b79d4754d8ca5870'
        }
      })
      setArtistNews(dataNews.value)

    }
    fetchNews()
  }, [])


  if (artistNews[0] === undefined) {
    return <>
      <div className="loading-box">
        <Loader />
      </div>
    </>
  }

  const bio = artistInfo.bio.summary
  const [artistBio, artistHref] = bio.split('<')
  const [discard, artistLink] = artistHref.split('"')


  return <>
    <div className="artist-page">
      <div className="artist-bio">
        <h1 className="artist-name">{artistName}</h1>
        <h2 className="heading-1">------------BIO------------</h2>
        <div className="info-container">
          <div className="artist-image">
            <img src={deezerInfo.picture} alt={artistName} />
          </div>
          <div className="bio">
            {artistBio}
          </div>
        </div>
        <a href={artistLink} target="_blank" rel="noreferrer">Read more on Last.fm</a>
      </div>

      <div className="news-container">
        <h2 className="heading-2">------------NEWS------------</h2>
        {artistNews.map((article, i) => {
          return <div className="news-item" key={i}>
            <div className="text">
              <a href={article.url} target="_blank" rel="noreferrer" className="news-link"><h2 className="headline">{article.name}</h2></a>
              <p className="description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer" className="news-link">Read more...</a>
            </div>
            {article.image === undefined ? '' :
              <div className="article-image">
                <img src={article.image.thumbnail.contentUrl} alt={article.name} />
              </div>
            }
          </div>
        })}
      </div>
    </div>
  </>

}

export default Artist