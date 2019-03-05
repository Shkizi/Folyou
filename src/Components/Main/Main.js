import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import NotificationsHubView from "../Pages/NotificationsHubView/NotificationsHubView"
import TalentSpaceView from "../Pages/TalentSpaceView/TalentSpaceView"
import ProposalsAreaView from "../Pages/ProposalsAreaView/ProposalsAreaView"
import PortfolioView from "../Pages/PortfolioView/PortfolioView"
import PortfoliosAreaView from "../Pages/PortfoliosAreaView/PortfoliosAreaView"
import AboutUsView from '../Pages/AboutUsView/AboutUsView';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/AboutUs' component={AboutUsView}/>
        <Route exact path='/TesterAxios' component={AboutUsView}/>
        <Route exact path='/NotificationsHub' component={NotificationsHubView}/>
        <Route exact path='/Talents' component={TalentSpaceView}/>
        <Route exact path='/Talent/:id' component={PortfolioView}/>
        <Route exact path='/Profile' component={TalentSpaceView}/>
        <Route exact path='/Proposals' component={ProposalsAreaView}/>
        <Route exact path='/Proposal/:id' component={PortfolioView}/>
        <Route exact path='/Portfolios' component={PortfoliosAreaView}/>
        <Route exact path='/Portfolio/:id' component={PortfolioView}/>
        
        
      </Switch>
    </main>
  )
  
  export default Main