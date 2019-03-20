import React from 'react'
import { Modal, Image } from 'react-bootstrap';
import './CardsModalPorfolio.css';

class CardsModal extends React.Component {
componentDidMount(){
    //TODO:
}
  render() {
            
    return (  
    <>
        <Modal.Header closeButton>
        <div><Image style={{backgroundColor: "black"}} className="C-Proposal-Avatar-Image"/></div>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </>
    );} }
  
  export default (CardsModal);
  