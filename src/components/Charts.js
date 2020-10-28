import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

const navigationArray = [
  {
    name: 'Top Worldwide',
    id: 3155776842,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/f1ac18441ab1dabc94282e4d1d5f4955/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top USA',
    id: 1313621735,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/5db67fb2a5d10d69fe4780dc11b2b174/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Ireland',
    id: 1313619455,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/6d2f56f6ab811a819527076b76f93d71/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Brazil',
    id: 1111141961,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/135c4adb3d5115d128c0635adc4ebae5/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Germany',
    id: 1111143121,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/fbd9767ddb69cf4c43889f8e141f19b2/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top France',
    id: 1109890291,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/b40301f3a462bcad6cc2e75937be05be/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Colombia',
    id: 1116188451,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/2095e4251bdd07ab8af8269dfa142a40/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Canada',
    id: 1652248171,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/afd4cd8b44c82dfbc04a0b5a889f95ba/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Mexico',
    id: 1111142361,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/155600857cc335866d78c03d0bde4809/264x264-000000-80-0-0.jpg'
  },
  {
    name: 'Top Netherlands',
    id: 1266971851,
    image: 'https://e-cdns-images.dzcdn.net/images/playlist/b7758fed610ecc6442768a424e23ae8e/264x264-000000-80-0-0.jpg'
  }
]



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




  return <>

    {/* <section className="playlists"> */}
      <CarouselProvider
        naturalSlideWidth={0}
        naturalSlideHeight={0}
        totalSlides={navigationArray.length}
        visibleSlides={7}
        infinite={true}>
        <Slider>
          {navigationArray.map((playlist, index) => {
            return <Slide index={index} key={index}><button className="playlist-button" style={{
              backgroundImage: `url(${playlist.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }} onClick={(event) => updateCurrentPlaylist(event.target.innerHTML)}>{playlist.name}</button></Slide>
          })}
        </Slider>
        <div className="slide-buttons">
          <ButtonBack className="slide-button">Back</ButtonBack>
          <ButtonNext className="slide-button">Next</ButtonNext>
        </div>
      </CarouselProvider>
    {/* </section> */}


    <div className='container t-4'>
      <div className="card ml-6">
        <div className="card-header">
          <div className="title chart-title">{currentPlaylist}</div>
        </div>
        <div className="card-content">
          <hr></hr>
          <div>
            {top10Array.map((track, index) => {
              return <div className="content" key={index}>
                {index + 1}. <img src={track.album.cover} /> {track.title} -
                <Link to={`project-2/artist/${track.artist.name}`}>
                  {track.artist.name}
                </Link>
                <hr></hr>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </>


}

export default Charts