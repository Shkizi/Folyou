import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import { CardContent, CardHeader } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';


const styles = {
    card: {
        maxWidth: 325,
        marginLeft: 20,
        display: 'flex',
        alignItems: 'flex-start'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

let n = 10;

function createElements(n,props){
    const {classes} = props;
    return [...Array(n)].map(n =>{ 
     return(<GridListTile key={n}>
    <Card  className={classes.card}>
        
        <CardContent>
        <CardHeader
          title="Universidade Europeia"
          subheader="Maio 31, 2019"
        />
         <CardMedia
          className={classes.media}
          image="https://pbs.twimg.com/profile_images/862599996281151488/EeyPYOpp_400x400.jpg"
          title="UE"
        />
        </CardContent>   
    </Card>
    </GridListTile>
     )})}


function Cards(props) {

    return (
        <GridList cols={3}>
        {createElements(n,props)}
        </GridList>
    );
}

export default withStyles(styles)(Cards);
