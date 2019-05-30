import React from 'react'
import { Carousel} from 'react-bootstrap';

import ServicesAPI from "../../../../serviceAPI";
import './HomeCarousel.css'


var S = new ServicesAPI();
class HomeCarousel extends React.Component { 

  
    render() {
        return ( 
       
            <Carousel className="Home-Carousel" >
            {this.props.parent.state.portTrending.concat(this.props.parent.state.portfolios).map(val =>{return(
                        <Carousel.Item className="HomeCarousel-Item">
                        <img
                          className="d-block w-100 HomeCarousel-Image"
                          src={S.baseURL()+"public/anexes/sheets/"+val.defaultImageSheet}
                          alt="First slide"
                        />
                        
                        
                        <Carousel.Caption style={{color:"black",backgroundColor: "rgba(147, 147, 147,0.4)"}}>
                          <b><h4>{val.nameSheet}</h4></b>
                          <p>{val.descriptionSheet}</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      );})}
           
           
           
          </Carousel>
        );} }

export default HomeCarousel;
