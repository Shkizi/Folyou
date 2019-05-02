import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Card, Image, Row, Button, Col } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import manel from '../../../Resources/Images/manel.png'
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
            <>
                <Card className="Profile-Header-Card">
                    <Row className="Profile-Top-Row">
                    <Image src="https://www.w3schools.com/howto/img_avatar.png" className="Modal-Portfolio-Avatar" roundedCircle />
                        <Card.Text className="Profile-Header-RegionCountry">
                            {"<-- Colocar imagem do pais --> " + this.state.user.regionUser}
                        </Card.Text>
                    </Row>

                    <Image src={manel} className="Profile-Avatar" roundedCircle />

                    <Card.Body style={{paddingTop: "5px"}}>
                        <Card.Text className="Profile-Header-Username">
                            {this.state.user.nameUser}
                        </Card.Text>
                    </Card.Body>
                </Card>

                    <Row>
                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingRight:5}}>
                            <Button className="Modal-Portfolio-Button-Categories"><Translate id="projects"></Translate></Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button className="Modal-Portfolio-Button-Categories"><Translate id="proposals"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={2}>
                        <Row>
                            <Col style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button className="Modal-Portfolio-Button-Categories"><Translate id="dashboard"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button className="Modal-Portfolio-Button-Categories"><Translate id="about me"></Translate></Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5}}>
                            <Button className="Modal-Portfolio-Button-Categories"><Translate id="settings"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
            </>
        )
    }
    }

export default withLocalize(ProfileView);
