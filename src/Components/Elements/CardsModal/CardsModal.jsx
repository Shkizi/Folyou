import React from 'react'
import { Modal } from 'react-bootstrap';
import CardsModalPortfolio from './Types/CardsModalPorfolio/CardsModalPortfolio'
import CardsModalProposal from './Types/CardsModalProposal/CardsModalProposal'
import CardsModalTalent from './Types/CardsModalTalent/CardsModalTalent'

import jsonPortfolio from '../Cards/CardPortfolio//CardPortfolioJSON'
import jsonProposal from '../Cards/CardProposal/CardProposalJSON'
import jsonTalent from '../Cards/CardTalent/CardTalentJSON'
import './CardsModal';

class CardsModal extends React.Component {
  
  constructor(props, context) {
    super(props, context);
   
    this.state = {
     data:{},
     typeModal: null,
     idModal: null,
     getterResolved:true,
    };
  }
componentDidMount(){
 

    //TODO: axios
    //getterResolved:true
}

cardType = () => {
  this.setState({
    data: ((this.props.parent.typeModal=="portfolioSheet")?jsonPortfolio[0]:((this.props.parent.typeModal=="talentSheet")?jsonTalent[0]:jsonProposal[0]))});
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
        size="xl"
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
  