import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MainTheme from '../../Style/theme';
import './Cards.css';
import { MuiThemeProvider } from 'material-ui/styles';
import { GridListTile } from '@material-ui/core';
import { GridList } from 'material-ui';


function CreateProposal(props,key) {
  return (
    <GridListTile key={key} style={{listStyleType: "none"}}> 
    <Card className="C-Proposal">
          <AccountCircle className="C-Proposal-Avatar"/>
          <h3 class="C-Proposal-Offer-Name">Javascript Fullstack</h3>
          <h6>Santos, Lisbon</h6>
                   <CardContent>
          <h4 class="Proposal-Proponent-Name" style={MainTheme.title}>Lisbon</h4>
          <p>Short proposal description Short proposal description Short proposal description 
          Short proposal description 
          </p>
          <h6 className={"Proposal-Proponent-Area"}>Dev</h6>
          <h6 className={"Proposal-Proponent-Date"}>13 days ago</h6>
          </CardContent>
      </Card>  
      </GridListTile>
  )
}

function Cards(props) {
  
    return (
      <MuiThemeProvider theme={MainTheme}>
      <GridList cols={4}>
      {CreateProposal(props,20)}
      {CreateProposal(props,15)}

        </GridList>
        </MuiThemeProvider>
    );
}

export default Cards;
