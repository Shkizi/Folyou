// view a talent area in details
//status for altering

import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";


const TalentAreaView = ({ match }) => {
    return (
      <div>
      The talent id is : {match.params.id || 'all'}
      </div>
    )
}
export default withLocalize(TalentAreaView);