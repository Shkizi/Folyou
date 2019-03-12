import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";

import serviceAPI from '../../../serviceAPI';

class AboutUsView extends React.Component {
    
    render() {
        return (
                <Row style={{margin: 0}}>
                <Translate id="aboutUs"/>
                </Row>
                
            
        )
    }
    }

export default withLocalize(AboutUsView);
