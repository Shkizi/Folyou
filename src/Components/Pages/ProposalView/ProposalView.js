//To view a proposal in detail
//status for altering

import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";

const ProposalView = ({ match }) => {
    return (
      <div>
      <div>
      The proposal id is : {match.params.id || 'all'}
      </div>
      <div>
        caralho
      </div>
      </div>
    )
}
export default withLocalize(ProposalView);