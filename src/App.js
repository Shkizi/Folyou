import React, { Component } from 'react';
import Menu from './Components/Pages/Menu/Menu'
import Cards from './Components/Elements/Cards/Cards'


class App extends Component {
  render() {
    return (
        <div>
             <Menu>
             </Menu>
             <div style={{paddingTop: 100}}>
            <Cards>
            </Cards>
            </div>
             </div>


    );
  }
}

export default App;
