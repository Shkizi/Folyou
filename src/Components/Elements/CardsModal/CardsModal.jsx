import React from 'react'
import { Modal } from 'react-bootstrap';
import CardsModalPortfolio from './Types/CardsModalPorfolio/CardsModalPortfolio'
import CardsModalProposal from './Types/CardsModalProposal/CardsModalProposal'
import CardsModalTalent from './Types/CardsModalTalent/CardsModalTalent'
import './CardsModal';

class CardsModal extends React.Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
     data:{},
     getterResolved:true,
    };
  }
componentDidMount(){

    //TODO: axios
    //getterResolved:true
}
cardBody = () => {
  return(
<CardsModalPortfolio parent={this} data={this.state.data}/>
  )
}
load = () => {
  return(
  <div>Loading Component Goes In Here</div>
  )
}
  render() {
            
    return (  
    <>
        <Modal
        show={this.props.parent.state.showModal} 
        onHide={this.props.closer} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      {
        (this.state.getterResolved)?this.cardBody():this.load()
      }
       
      </Modal>
    </>
    );} }
  
  export default (CardsModal);
  