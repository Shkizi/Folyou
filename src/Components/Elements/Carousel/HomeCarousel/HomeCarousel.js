import React from 'react'
import { Carousel} from 'react-bootstrap';

import './HomeCarousel.css'


class HomeCarousel extends React.Component { 

  
    render() {
        return ( 
       
            <Carousel className="Home-Carousel">
            <Carousel.Item className="HomeCarousel-Item">
              <img
                className="d-block w-100 HomeCarousel-Image"
                src="https://www.w3schools.com/w3css/img_lights.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="HomeCarousel-Item">
              <img
                className="d-block w-100 HomeCarousel-Image"
                src="https://www.w3schools.com/w3css/img_lights.jpg"
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="HomeCarousel-Item">
              <img
                className="d-block w-100 HomeCarousel-Image"
                src="https://www.w3schools.com/w3css/img_lights.jpg"
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );} }

export default HomeCarousel;
