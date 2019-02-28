//To view the portfolio of a user
//with their portfolio
//status for altering
import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";

const PortfolioView = ({ match }) => {
    return (
      <div>
      The portfolio id is : {match.params.id || 'all'}
      </div>
    )
}
export default withLocalize(PortfolioView);