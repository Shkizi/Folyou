//To view a proposal in detail
//status for altering

import React from 'react'
import { Form, Col, Container} from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import "./ProposalView.css"

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
class ProposalView extends React.Component {

  
  state = {
    category: ''
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Form.Row className="Proposal-Row">
      <Form.Group as={Col} controlId="formGridEmail">
      <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.category}
          onChange={this.handleChange}
          name="category"
          margin="normal"
          variant="outlined"
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridEmail">
        <InputLabel shrink htmlFor="category-label-placeholder">
        <Translate id="category"/> 
          </InputLabel>
        <Select
            input={<Input name="category" id="category-label-placeholder" />}
             displayEmpty
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            inputProps={{
              name: 'category',
            }}
          >
            <MenuItem value="">
              <Translate id="category"/>
            </MenuItem>
            <MenuItem value={1}><Translate id="webdevelopment"/></MenuItem>
            <MenuItem value={2}><Translate id="softwaredevelopment"/></MenuItem>
            <MenuItem value={3}><Translate id="gamedevelopment"/></MenuItem>
            <MenuItem value={4}><Translate id="mobiledevelopment"/></MenuItem>
            <MenuItem value={5}><Translate id="art"/></MenuItem>
            <MenuItem value={6}><Translate id="design"/></MenuItem>
            <MenuItem value={7}><Translate id="photography"/></MenuItem>
          </Select>
        </Form.Group>


    </Form.Row>
    );
  }
}
export default withLocalize(withStyles(styles)(ProposalView));