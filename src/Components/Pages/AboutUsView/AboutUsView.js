import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";

import serviceAPI from '../../../serviceAPI';


class AboutUsView extends React.Component {
    state = {
        user: {},
        error:{},
        
      }
    //request example
    componentDidMount() {
        serviceAPI.get(`getUserById`, 
          { params: {
                idUser: '1'
            }})
        .then(res => {
            if(!res.data.error){
        const user = res.data.user;
        console.log(res);
        this.setState({ user });
            }else{
                const error={message:"Data not arriving",error:true};
                this.setState( error );
            }
        })
    }
    render() {
        return (
            <Container fluid={true}>
                <Row style={{margin: 0}}>
                {JSON.stringify(this.state.user)}
                </Row>
            </Container>
        )
    }
    }

export default withLocalize(AboutUsView);
