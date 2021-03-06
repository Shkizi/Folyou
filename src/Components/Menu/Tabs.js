import React from 'react';
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import { withLocalize } from "react-localize-redux";
import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import jsonarray from './Tabs_def';
import { Link } from "react-router-dom";
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Tabs extends React.Component {

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
          
        
        <List>
        <LanguageSelector languages={this.props.app.props.languages} app={this.props.app} cookies={this.props.cookies}/>
          {jsonarray.map((text, index) => (
            <Link to={text.link} onClick={this.props.closer}>
            <ListItem button key={text.page}>
              <ListItemIcon>{text.icon} </ListItemIcon>
              <ListItemText primary={text.page} />
              
            </ListItem>
            </Link>
          ))}
        </List>
       {/* <Divider />
         <List>
          {['About us'].map((text, index) => (
             <Link to={"/AboutUs"}>
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List> */}
       
      </div>
    );

    return (
        <Drawer 
        open={this.props.parent.state.showTabs} 
        onClose={this.props.closer}
        anchor="left">
          <div
            tabIndex={0}
            onKeyDown={this.props.closer}
          >
            {sideList}
          </div>
        </Drawer>
    );
  }
}

export default withCookies(withLocalize(withStyles(styles)(Tabs)));
