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
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/582d158f-8f07-4157-97b9-d90fbabe6ea1/dd58hen-6f3f7ceb-e5e3-4cc1-928d-62202551fbea.png/v1/fill/w_1195,h_669,q_70,strp/moodyblue_stock_39_by_moodyblue_dd58hen-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY4MCIsInBhdGgiOiJcL2ZcLzU4MmQxNThmLThmMDctNDE1Ny05N2I5LWQ5MGZiYWJlNmVhMVwvZGQ1OGhlbi02ZjNmN2NlYi1lNWUzLTRjYzEtOTI4ZC02MjIwMjU1MWZiZWEucG5nIiwid2lkdGgiOiI8PTMwMDIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.qXrckbSvZJ6pEz_j1l8Qjzl_4Wed8OCdQDawCf9Pa_o"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Projecto Platina</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="HomeCarousel-Item">
              <img
                className="d-block w-100 HomeCarousel-Image"
                src="https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2017/theoreticala.jpg"
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Projecto Gold</h3>
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
                <h3>Projecto Diamond</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );} }

export default HomeCarousel;
