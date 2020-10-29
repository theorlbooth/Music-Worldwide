import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import navigationArray from './Playlists'



const Charts = () => {

  const [playlistData, updatePlaylistData] = useState({})
  const [currentPlaylist, updateCurrentPlaylist] = useState('Top Worldwide')


  const currentNamePlaylist = navigationArray.map(name => {
    return name.name
  })

  const currentPlaylistID = navigationArray[currentNamePlaylist.indexOf(currentPlaylist)].id


  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${currentPlaylistID}`)
      updatePlaylistData(data)
    }
    fetchData()
  }, [currentPlaylist])



  if (playlistData.tracks === undefined) {
    return <>
      <div className="loading-box">
        <Loader />
      </div>
    </>
  }

  const top10Array = playlistData.tracks.data.slice(0, 10)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6.5,
      slidesToSlide: 6
    }
  }



  return <>

    <section className="playlists">
      <Carousel
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        centerMode={true}
      >
        {navigationArray.map((playlist, index) => {
          return <div key={index}><button className="playlist-button" style={{
            backgroundImage: `url(${playlist.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} onClick={(event) => updateCurrentPlaylist(event.target.innerHTML)}>{playlist.name}</button></div>
        })}
      </Carousel>

    </section>

    <div className="flexcontainer">
      <div className="chart-container">
        <h1>{currentPlaylist}</h1>
        <hr></hr>
        <div>
          {top10Array.map((track, index) => {
            let playState = false
            let idPlaying = ''
            return <div className="track-info" key={index}>
              <div className="track-position">{index + 1}.</div>
              <img src={track.album.cover} />
              <div className="track-text">
                <div className="track-name">{track.title}</div>
                <div className="track-artist">
                  <Link to={`charts/${track.artist.name}/${track.artist.id}`}>
                    {` ${track.artist.name}`}
                  </Link>
                </div>
              </div>
              <img src='/images/play.png' alt="play button" className="play-button"  id={`play${index}`} onClick={() => {
                playState = !playState

                { playState ? 
                  document.querySelector(`#play${index}`).src = '/images/pause.png' : document.querySelector(`#play${index}`).src = '/images/play.png' }

                document.querySelector('.player').src = `${track.preview}`
                { playState ? document.querySelector('.player').play() : document.querySelector('.player').pause() }

                // setPlayState(!playState)
                // document.querySelectorAll('audio').pause()

              }} />
            </div>
          })}
        </div>
      </div>
    </div>
    <audio src='' className='player'></audio>
  </>


}

export default Charts