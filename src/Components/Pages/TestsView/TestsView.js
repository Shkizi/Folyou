import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import ServicesAPI from '../../../serviceAPI.js';
var S = new ServicesAPI();

class TestAxios extends React.Component {
    state = {
        user: {},
        error:{},
        
      }
    //request example
    componentDidMount() {
        S.serviceAPI().get(`getUserById`, 
          { params: {
                idUser: '1'
            }})
        .then(res => {
            if(!res.data.error){
        const user = res.data.user;
        console.log(res);
        this.setState({ user });
            }else{
                const error={message:res.data.error,error:true};
                this.setState( error );
            }
        })
    }
    render() {
        return (
                <Row style={{margin: 0}}>
                {JSON.stringify(this.state.user)}
                </Row>
           
        )
    }
    }

export default withLocalize(TestAxios);
