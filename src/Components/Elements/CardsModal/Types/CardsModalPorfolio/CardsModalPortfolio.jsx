import React from 'react'
import { Modal, Image, Card, Row } from 'react-bootstrap';
import './CardsModalPorfolio.css';
import json from '../../../Cards/CardPortfolio/CardPortfolioJSON'

class CardsModal extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {}
    };
    

  }
  componentWillReceiveProps () {
    this.setState({data: json[0]})
  }

  render() {
            
    return (  
      <Modal
        show={this.props.parent.state.showModalPortfolio} 
        onHide={this.props.closer} 
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        <div>
          <Row style={{padding: "16px"}}>
          <Image src="https://www.w3schools.com/howto/img_avatar.png" className="Modal-Portfolio-Avatar" roundedCircle />
          <div className="Modal-Portfolio-Username">{this.state.data.name}</div>
          </Row>
          </div>
        </Modal.Header>
        <Modal.Body  style={{padding: 0}}>
        <Card style={{backgroundColor: "#f1c40f"}}>
          <Card.Body>
            <Row  style={{padding: "16px"}}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/255px-Flag_of_Portugal.svg.png" className="C-Proposal-Avatar-Image"/>
              <div className="Modal-Portfolio-User-Location">{this.state.data.region + ", " + this.state.data.country}</div>
              <div className="Modal-Porfolio-Sheet-Category">{this.state.data.category}</div>
            </Row>
            <div className="Modal-Portfolio-SheetName">{this.state.data.sheetName}</div> 

          
          </Card.Body>
        </Card>
          <Card>
            {this.state.data.description}
            
          </Card>
       

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
    );} }
  
  export default (CardsModal);
  