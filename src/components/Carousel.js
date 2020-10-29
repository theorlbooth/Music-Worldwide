import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import navigationArray from './Playlists'




const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6.5,
    slidesToSlide: 6
  }
}




const CarouselComp = (props) => {

  function filterPlaylists() {
    const filtPlaylists = navigationArray.filter(playlist => {
      const name = playlist.name.toLowerCase()
      const filterText = props.filteredPlaylists.toLowerCase()
      return name.includes(filterText)
    })
    return filtPlaylists
  }
  
  if (filterPlaylists().length < 8) {
    return <>

      <section className="playlists">
        <div className="small-playlists">
          {filterPlaylists().map((playlist, index) => {
            return <div key={index}><button className="playlist-button" style={{
              backgroundImage: `url(${playlist.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }} onClick={(event) => props.updateCurrentPlaylist(event.target.innerHTML)}>{playlist.name}</button></div>
          })}
        </div>

        <input className="input" placeholder="Search..." onChange={(event) => props.updateFilteredPlaylists(event.target.value)} value={props.filteredPlaylists} />
      </section>
    </>
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
        {filterPlaylists().map((playlist, index) => {
          return <div key={index}><button className="playlist-button" style={{
            backgroundImage: `url(${playlist.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} onClick={(event) => props.updateCurrentPlaylist(event.target.innerHTML)}>{playlist.name}</button></div>
        })}
      </Carousel>

      <input className="input" placeholder="Search..." onChange={(event) => props.updateFilteredPlaylists(event.target.value)} value={props.filteredPlaylists} />

    </section>
  </>

}

export default CarouselComp