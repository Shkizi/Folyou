import React from 'react'
import { Link } from "react-router-dom";
import { Modal, Image, Card, Row, Button, Col } from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import './CardsModalProposal.css';
import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { isNull } from 'util';
import ServicesAPI from "../../../../../serviceAPI";
var S = new ServicesAPI();
class CardsModalPortfolio extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {}
    };
    

  }
  componentDidMount(){
  
    
  }

  render() {
    if( this.props.parent.state.showModalProposal){
      let data = {};
      console.log(this.props.parent.state.propTrending);
      console.log(this.props.parent.state.proposals);
      console.log(this.props.parent.state.idModal);
      if (!(typeof this.props.parent.state.propTrending ==="undefined")&&this.props.parent.state.propTrending.length > 0){
       this.props.parent.state.propTrending.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.propTrending[indexPort].idProposal == this.props.parent.state.idModal){
          data = this.props.parent.state.propTrending[indexPort];
            }
        });
      } if (!(typeof this.props.parent.state.proposals ==="undefined")&&this.props.parent.state.proposals.length > 0){
        this.props.parent.state.proposals.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.proposals[indexPort].idProposal == this.props.parent.state.idModal){
          data = this.props.parent.state.proposals[indexPort];
         
            }
        });
      }
      else{data = {};}
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalProposal} 
            onHide={this.props.closer} 
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
            <div>
            <Link variant="link" to={"/Profile/"+data.idUser}>
              <Row style={{padding: "16px"}}>
              <Image src={(data.avatarUser=="")?"https://www.w3schools.com/howto/img_avatar.png":S.baseURL()+"public/anexes/profiles/"+data.avatarUser} className="Modal-Portfolio-Avatar" roundedCircle />
              <div className="Modal-Portfolio-Username">{data.nameUser}</div>
              </Row>
              </Link>
              <Link variant="primary" to={"/ProposalUpdate/"+data.idProposal}><Button>Config</Button></Link>
              </div>
            </Modal.Header>
            <Modal.Body  style={{padding: 0}}>
            <Card >
              <Card.Body>
                <Row  style={{padding: "16px"}}>
                  <Image src={getImageLanguage(data.countryProposal)} className="Modal-Portfolio-Avatar-Country" roundedCircle/>
                  <div className="Modal-Portfolio-User-Location">{data.regionProposal}</div>
                  <div className="Modal-Portfolio-Proposal-Category"><b><Translate id="category profile"></Translate></b>{"  " + data.valueCategory}</div>
                </Row>
                <div className="Modal-Portfolio-ProposalName">{data.nameProposal}</div> 
                <div className="Modal-Portfolio-Keywords"><b><Translate id="keywords"></Translate> </b>{data.keywords.join(", ")}</div>

              
              </Card.Body>
            </Card>

              <Card className="Modal-Portfolio-Description-Area">
                <div><b><Translate id="description"></Translate></b></div>
                <div className="Modal-Portfolio-Description">{data.descriptionProposal}</div>

                <Card.Footer style={{backgroundColor: "gray"}}>
                  Anexos
                </Card.Footer>

              </Card>

            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col md={6}>
                <Link to={"/ApplicationRegister/"+data.idProposal}>
                <Button className={"Modal-Portfolio-Button-Register"}><Translate id="apply for proposal"></Translate></Button>
                </Link>
                </Col>
                <Col md={6}>
                <Button className={"Modal-Portfolio-Button-Message"}><Translate id="message proponent"></Translate></Button>
                </Col>

              </Row>
              
            </Modal.Footer>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
}
  
  export default (CardsModalPortfolio);
  