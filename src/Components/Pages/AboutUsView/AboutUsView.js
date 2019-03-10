import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";

import serviceAPI from '../../../serviceAPI';
import BarChart from '../../Elements/BarChart/BarChart';


class AboutUsView extends React.Component {
    
    render() {
        return (
            <Container fluid={true}>
                <Row style={{margin: 0}}>
                <Translate id="aboutUs"/>
                <BarChart data={[5,10,1,3]} size={[500,500]} />
                </Row>
                
            </Container>
        )
    }
    }

export default withLocalize(AboutUsView);
