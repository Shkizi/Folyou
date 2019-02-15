import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const styles = {
    card: {
        maxWidth: "320px",
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: "50px",
        marginLeft: "30px"
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        height: "225px",
    },
    page: {
      backgroundColor: "#f4f7f6",
      paddingTop: "50px"
    },

};

let n = 10;

function createElements(n,props){
    const {classes} = props;
    return [...Array(n)].map(n =>{ 
     return(<GridListTile key={n}>

    <Card className={classes.card}>
      <CardActionArea>
         <Typography gutterBottom variant="h6" component="h2" align="center">
            Project Name
          </Typography>
        <CardMedia className={classes.media}
          image="http://lusonoticias.com/old/images/stories/2013/LUSONOTICIAS/EDUCACAO/IADE-logo.jpg"
          title="Project Image"
        />
        <CardContent>
          
        <Typography component="p" variant="subheading">
          Short project descrition Short project descrition Short project descrition Short project descrition 
        </Typography>
        </CardContent>
        <Divider/>
        <Grid container alignItems="center">
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Alexandre Maria" src="https://avatarfiles.alphacoders.com/946/94610.jpg" />
        </ListItemAvatar>
        <ListItemText style={{marginTop:"10px"}}>
            By Alexandre Maria
        </ListItemText>
        </ListItem>
        </Grid>

      </CardActionArea>
    </Card>
    </GridListTile>
     )})}


function Cards(props) {
  const {classes} = props;
    return (
        <GridList cols={4} cellHeight={"100%"} className={classes.page}>
        {createElements(n,props)}
        </GridList>
    );
}

export default withStyles(styles)(Cards);
