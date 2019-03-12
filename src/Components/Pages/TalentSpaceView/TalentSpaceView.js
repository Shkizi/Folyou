//view to see all the talents

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';

var data;
const TalentSpaceView = () => (

         <Row style={{margin: 0}}>
            <CardTalent data={data}/>
        </Row>
   
)

export default withLocalize(TalentSpaceView);
