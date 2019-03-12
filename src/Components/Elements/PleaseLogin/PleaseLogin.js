
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import { withCookies } from 'react-cookie';
import './PleaseLogin.css'

class PleaseLogin extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Row style={{margin: 0}}>
                    <Translate id="pleaseLogin"/>
                </Row>
            </Container>
        );

    }
}

export default withCookies(withLocalize(PleaseLogin));
