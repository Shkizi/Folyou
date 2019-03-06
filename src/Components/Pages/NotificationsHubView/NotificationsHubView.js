//place for all the portfolios

import React from 'react'
import { Container, Row, Table } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";

import serviceAPI from '../../../serviceAPI';

class NotificationHubView extends React.Component {
    state = {
        notifications:[],
        error:{},
      }
    //request example
    componentDidMount() {
        serviceAPI.get(`getNotificationsByUserId`, 
          { params: {
                idUser: '1'
            }})
        .then(res => {
            if(!res.data.error){
        const notifications = res.data.notifications;
        console.log(res);
        this.setState({ notifications });
            }else{
                const error={error:true, message:res.data.error};
                this.setState( error );
            }
        })
    }
    render() {
        return (
    <Container fluid={true}>
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
        )}
}

export default withLocalize(NotificationHubView);
