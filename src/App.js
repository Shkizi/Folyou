import React, { Component } from 'react';
import './App.css'
import Menu from './Components/Menu/Menu';
import Main from './Components/Main/Main';



class App extends Component {
  render() {
    return (
      <div>
          <Menu/>
          <Main/>
          </div>
    );
  }
}

export default App;
