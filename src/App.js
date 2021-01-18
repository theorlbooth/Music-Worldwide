import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Charts from './components/Charts'
import Artist from './components/Artist'
import ArtistSearch from './components/ArtistSearch'

import 'bulma'
import './styles/style.scss'



const App = () => {

  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/Music-Worldwide" component={Home} />
      <Route exact path="/Music-Worldwide/charts" component={Charts} />
      <Route exact path="/Music-Worldwide/search" component={ArtistSearch} />
      <Route exact path="/Music-Worldwide/charts/:artistName/:artistID" component={Artist} />
    </Switch>
  </BrowserRouter>
}

export default App

// playlistData={playlistData}