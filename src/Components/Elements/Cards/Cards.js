import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import './Cards.css'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { typography } from 'material-ui/styles';


function Cards() {
    return (
      <Grid item xs={3}>
        <Card>
          <CardContent className="Card-Proposal">
          <AccountCircle/><br/>
          <typography className>Lisbon</typography>
            
          </CardContent>
        </Card>  
        </Grid>
      
    );
}

export default Cards;
