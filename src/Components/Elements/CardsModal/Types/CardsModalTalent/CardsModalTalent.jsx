import React from 'react'
import { Modal, Image, Card, Row,Button } from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import './CardsModalTalent.css';
import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { TiHeart } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
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
    if(this.props.parent.state.showModalTalent){
      let data = {};
      console.log(this.props.parent.state.propTrending);
      console.log(this.props.parent.state.talents);
      console.log(this.props.parent.state.idModal);
      if (!(typeof this.props.parent.state.talents ==="undefined")&&this.props.parent.state.talents.length > 0){
        this.props.parent.state.talents.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.talents[indexPort].idTalentArea == this.props.parent.state.idModal){
          data = this.props.parent.state.talents[indexPort];
         
            }
        });
      }
      else{data = {};}
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalTalent} 
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
              <Link variant="link" to={"/TalentAreaUpdate/"+data.idTalentArea}><Button>Config</Button></Link>
              </div>
            </Modal.Header>
            <Modal.Body  style={{padding: 0}}>
            <Card>
              <Card.Body>
                <Row  style={{padding: "16px"}}>
                  <Image src={getImageLanguage(data.countryUser)} className="Modal-Portfolio-Avatar-Country" roundedCircle/>
                  <div className="Modal-Portfolio-User-Location">{data.regionUser}</div>
                  <div className="Modal-Portfolio-Talent-Category"><b><Translate id="category"></Translate></b>{"  " + data.valueCategory}</div>
                </Row>
                <div className="Modal-Portfolio-TalentName">{data.nameTalentArea}</div> 
                
                <div className="Modal-Portfolio-Keywords"><b><Translate id="keywords"></Translate> </b>{": " + data.keywords.join(", ")}</div>

              
              </Card.Body>
            </Card>

              <Card className="Modal-Portfolio-Description-Area">
                <div><b><Translate id="description"></Translate></b></div>
                <div className="Modal-Portfolio-Description">{data.descriptionTalentArea}</div>
              </Card>

              <Card className="Modal-Talent-Anexes">
                  Anexos
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
  