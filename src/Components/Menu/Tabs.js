import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import jsonarray from './TabsJSON';
import {  Link } from "react-router-dom";
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
          {jsonarray.map((text, index) => (
            <Link to={text.link}>
            <ListItem button key={text.page}>
              <ListItemIcon><text.icon /> </ListItemIcon>
              <ListItemText primary={text.page} />
              
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['About us'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
        <Drawer 
        open={this.props.parent.state.showTabs} 
        onClose={this.props.closer}
        anchor="left">
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closer}
            onKeyDown={this.props.closer}
          >
            {sideList}
          </div>
        </Drawer>
    );
  }
}

export default withStyles(styles)(Tabs);
