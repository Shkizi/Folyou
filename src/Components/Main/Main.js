import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import NotificationsHubView from "../Pages/NotificationsHubView/NotificationsHubView"

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/NotificationsHub' component={NotificationsHubView}/>
      </Switch>
    </main>
  )
  
  export default Main