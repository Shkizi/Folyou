import React from 'react'
import { Modal, Image, Card, Row, Button } from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import './CardsModalPorfolio.css';
import {  Link } from "react-router-dom";
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
    if( this.props.parent.state.showModalPortfolio){
      let data = {};
      
      if (!(typeof this.props.parent.state.portTrending ==="undefined")&&this.props.parent.state.portTrending.length > 0){
       this.props.parent.state.portTrending.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.portTrending[indexPort].idSheet == this.props.parent.state.idModal){
          data = this.props.parent.state.portTrending[indexPort];
            }
        });
      } if (!(typeof this.props.parent.state.portfolios ==="undefined")&&this.props.parent.state.portfolios.length > 0){
        this.props.parent.state.portfolios.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.portfolios[indexPort].idSheet == this.props.parent.state.idModal){
          data = this.props.parent.state.portfolios[indexPort];
         
            }
        });
      }
      else{data = {};}
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalPortfolio} 
            onHide={this.props.closer} 
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
            <div><Link variant="link" to={"/Profile/"+data.idUser}>
              <Row style={{padding: "16px"}}>
              <Image src={(data.avatarUser=="")?"https://www.w3schools.com/howto/img_avatar.png":S.baseURL()+"public/anexes/profiles/"+data.avatarUser} className="Modal-Portfolio-Avatar" roundedCircle />
              <div className="Modal-Portfolio-Username">{data.nameUser}</div>
              </Row>
            
              </Link>
              <Link variant="primary" to={"/SheetUpdate/"+data.idSheet}><Button>Config</Button></Link>
              </div>
            </Modal.Header>
            <Modal.Body  style={{padding: 0}}>
            <Card style={{backgroundColor: "inherit"}}>
              <Card.Body>
                <Row  style={{padding: "16px"}}>
                  <Image src={getImageLanguage(data.countrySheet)} className="Modal-Portfolio-Avatar-Country" roundedCircle/>
                  <div className="Modal-Portfolio-User-Location">{data.regionSheet}</div>
                  <div className="Modal-Portfolio-Sheet-Category"><b><Translate id="category"></Translate></b>{"  " + data.valueCategory}</div>
                </Row>
                <div className="Modal-Portfolio-SheetName">{data.nameSheet}</div> 
                <div className="Modal-Portfolio-Keywords"><b><Translate id="keywords"></Translate> </b>{data.keywords.join(", ")}</div>

              
              </Card.Body>
            </Card>

              <Card className="Modal-Portfolio-Description-Area">
                <div><b><Translate id="description"></Translate></b></div>
                <div className="Modal-Portfolio-Description">{data.descriptionSheet}</div>

                <Card.Footer style={{backgroundColor: "red"}}>
                  Anexos
                </Card.Footer>

              </Card>

          

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
}
  
  export default (CardsModalPortfolio);
  