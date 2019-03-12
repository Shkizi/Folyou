//place for all the portfolios


import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Table } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import isCookieValid from '../../../cookies.js';
import ServicesAPI from '../../../serviceAPI.js';

import { withCookies } from 'react-cookie';
import PleaseLogin from '../../Elements/PleaseLogin/PleaseLogin.js';

var S = new ServicesAPI();

class NotificationHubView extends React.Component {
    state = {
        notifications:[],
        error:false,
        redirect:false,
        message:{}
      }
      
    //request example
    componentDidMount() {
        const {cookies}= this.props.cookies;
        if(isCookieValid(cookies,"folyou_userId")){
            
            S.getNotificationsByUserId(cookies["folyou_userId"])
            .then(res => {
                if(!res.data.error){
            const notifications = res.data.notifications;
            console.log(res);
            this.setState({ notifications });
                }else{
                   var error=true;
                    var message=res.data.error;
                    this.setState( {error} );
                    this.setState( {message} );
                }
            });
        }else{ 
            var error=true;
            var message="pleaseLogin";
            this.setState( {error} );
            this.setState( {message} );
        }
        
    }
  
    render() {
        const {cookies}= this.props.cookies;
        
       
           return (isCookieValid(cookies,"folyou_userId"))?(<Container fluid={true}>
        <Row style={{margin: 0}}>
        <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                </tr>
            </thead>
            <tbody>
           
                <tr>
                <td></td>
                </tr>
            </tbody>
            </Table>
            
        </Row>
    </Container>
        ):(<PleaseLogin/>);
        
    }

}

export default withCookies(withLocalize(NotificationHubView));
