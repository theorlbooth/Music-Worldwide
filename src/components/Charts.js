import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import 'react-multi-carousel/lib/styles.css'
import navigationArray from './Playlists'
import CarouselComp from './Carousel'
import pauseButton from '../images/pause.png'
import playButton from '../images/play.png'


const Charts = () => {

  const [playlistData, updatePlaylistData] = useState({})
  const [currentPlaylist, updateCurrentPlaylist] = useState('Top Worldwide')
  const [filteredPlaylists, updateFilteredPlaylists] = useState('')


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


  return <>

    <section className="playlists">
      <CarouselComp currentPlaylist={currentPlaylist} updateCurrentPlaylist={updateCurrentPlaylist} updateFilteredPlaylists={updateFilteredPlaylists} filteredPlaylists={filteredPlaylists}/>

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
              <img src= { playButton } alt="play button" className="play-button" id={`play${index}`} onClick={() => {
                playState = !playState

                { playState ?
                  document.querySelector(`#play${index}`).src = pauseButton : document.querySelector(`#play${index}`).src = playButton}

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