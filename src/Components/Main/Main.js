
import { Switch, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import NotificationsHubView from "../Pages/NotificationsHubView/NotificationsHubView"
import React, { Component } from 'react';
import TalentSpaceView from "../Pages/TalentSpaceView/TalentSpaceView"
import ProposalsAreaView from "../Pages/ProposalsAreaView/ProposalsAreaView"
import PortfoliosAreaView from "../Pages/PortfoliosAreaView/PortfoliosAreaView"
import AboutUsView from '../Pages/AboutUsView/AboutUsView';
import TestsView from '../Pages/TestsView/TestsView';
import Dashboard from '../Pages/DashBoardTestView/DashBoard';
import Profile from '../Pages/ProfileView/Profile';
import { Container} from 'react-bootstrap';
import Notifications from '../../Components/Elements/Notifications/Notifications';
class Main  extends Component {
  
  render(){
     
    return(
    <main>
       <Container fluid={true}  style={{marginTop: 0}}>
            <Notifications notifParent={this.props.app}/>
      
      <Switch>
        <Route exact path='/' render={(routeProps)=><Home {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/AboutUs'  render={(routeProps)=><AboutUsView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/TestAxios'  render={(routeProps)=><TestsView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/NotificationsHub'  render={(routeProps)=><NotificationsHubView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/Talents'  render={(routeProps)=><TalentSpaceView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/Profile'  render={(routeProps)=><TalentSpaceView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/Proposals'  render={(routeProps)=><ProposalsAreaView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/Portfolios'  render={(routeProps)=><PortfoliosAreaView {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/TestDashBoard'  render={(routeProps)=><Dashboard {...routeProps} app={this.props.app}/>}/>
        <Route exact path='/Profile/:id' render ={(routeProps)=><Profile {...routeProps} app={this.props.app}/>}/>
      </Switch>
      </Container>
    </main> 
  );
  }
}
  export default Main;