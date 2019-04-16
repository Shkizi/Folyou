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
          <Image style={{backgroundColor: "black"}} className="C-Proposal-Avatar-Image"/>
          {this.state.data.sheetName}
          </div>
        </Modal.Header>
        <Modal.Body>
        <Card>
          <Card.Body>
            <Row>
              <Image style={{backgroundColor: "black"}} className="C-Proposal-Avatar-Image"/>
              <div>Lisbon, Portugal</div>
              <div className="C-Proposal-Category">Category</div>
            </Row>
          
          </Card.Body>
        </Card>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
    );} }
  
  export default (CardsModal);
  