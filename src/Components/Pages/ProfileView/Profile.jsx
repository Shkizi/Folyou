import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Card, Image, Row, Button, Col } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";

import './Profile.css'
import ServicesAPI from '../../../serviceAPI.js';
var S = new ServicesAPI();




class ProfileView extends React.Component {
    state = {
        user: {},
        error:{},
        
      }
    //request example
    componentDidMount() {
        S.serviceAPI().get(`getUserById`, 
          { params: {
                idUser: '1',
                nameUser: '',
                countryUser: '',
                regionUser: ''
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
            <>
                <Card className="Profile-Header-Card">
                    <Row style={{margin:"1%"}}>
                        <Image className="Profile-Header-Country" />
                        <Card.Text className="Profile-Header-RegionCountry">
                            {this.state.user.regionUser},{this.state.user.countryUser}
                        </Card.Text>
                    </Row>

                    <Card.Body className="Profile-Card-Body">
                        <Image className="Profile-Header-Avatar" />
                        <Card.Text className="Profile-Header-Username">
                            {this.state.user.nameUser}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="Profile-Menu-Card">
                    <Row>
                        <Col md={5}>
                        <Row>
                            <Col md={6}>
                            <Button variant="link">Projetos</Button>
                            </Col>
                            <Col md={6}>
                            <Button variant="link">Sobre mim</Button>
                            </Col>
                        </Row>
                        </Col>
                        <Col md={2}>
                        <p></p>
                        </Col>
                        <Col md={5}>
                        <Row>
                            <Col md={6}>
                            <Button variant="link">Estatisticas</Button>
                            </Col>
                            <Col md={6}>
                            <Button variant="link">Badges</Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </Card>
            </>
        )
    }
    }

export default withLocalize(ProfileView);
