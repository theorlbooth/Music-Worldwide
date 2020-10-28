import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Charts from './components/Charts'

import 'bulma'
import './styles/style.scss'



const App = () => {
  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/project-2/" component={Home} />
      <Route exact path="/project-2/charts" component={Charts} />
      {/* <Route exact path="/project-2" component={} /> */}
    </Switch>
  </BrowserRouter>
}

export default App