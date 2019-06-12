import React from 'react';
import { Row, Col, Table, Button} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../serviceAPI';
import "./Rankings.css";

var S = new ServicesAPI();

    
class CreateProject extends React.Component { 

    constructor(props, context) {
        super(props, context);
       
        this.state = {
            activeValue: true,
            mostViewed: true,
            mostRecommended: false,
            mostBadges: false,
            mostRecommendedUsers:[]
        };
        this.handleMostViewedClick = this.handleMostViewedClick.bind(this);
        this.handleMostRecommendedClick = this.handleMostRecommendedClick.bind(this);
        this.handleMostBadgesClick = this.handleMostBadgesClick.bind(this);
      }
      componentDidMount(){
        
        S.getter(`getTopRecommendedUsers`, {
          
          }, (res) => { 
              console.log("RES Message:",res);
              this.setState({mostRecommendedUsers:res.data.users});
            },
            (error) => { 
                console.log("Error: Mesage", error);
                this.setState({ error: {message:error,error:true} });
            });
      }

    handleMostViewedClick() {
        this.setState({
            mostViewed: true,
            mostRecommended: false,
            mostBadges: false
        })
    }

    handleMostRecommendedClick() {
        this.setState({
            mostViewed: false,
            mostRecommended: true,
            mostBadges: false
        })
    }

    handleMostBadgesClick() {
        this.setState({
            mostViewed: false,
            mostRecommended: false,
            mostBadges: true
        })
    }


    mostViewedTable () {
        return (
            <Table striped bordered hover className="Rankings-Table">
            <thead>
                <tr>
                <th><Translate id="position"></Translate></th>
                <th><Translate id="user"></Translate></th>
                <th><Translate id="project name"></Translate></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>

             </tbody>
            </Table>
        )
    }

    mostRecommendedTable () {
        let i =0;
        return (
            
            <Table striped bordered hover className="Rankings-Table">
            <thead>
                <tr>
                <th><Translate id="position"></Translate></th>
                <th><Translate id="user"></Translate></th>
                <th><Translate id="number of recomendations"></Translate></th>
                </tr>
            </thead>
            <tbody>
            {this.state.mostRecommendedUsers.map(val =>{ i ++; return(
                 <tr>
                 <td>{i}</td>
                 <td>{val.nameUser}</td>
                 <td>{val.recom}</td>
                 </tr>
                  );})}
                
             </tbody>
            </Table>
        )
    }

    mostBadgesTable () {
        return (
            <Table striped bordered hover className="Rankings-Table">
            <thead>
                <tr>
                <th><Translate id="position"></Translate></th>
                <th><Translate id="user"></Translate></th>
                <th><Translate id="number of badges"></Translate></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>4</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>5</td>
                </tr>
             </tbody>
            </Table>
        )
    }

 
    render () {
        return (
            <>
            <Button variant="success" className="Rankings-Button-MostViewed" active={this.state.mostViewed==true} onClick={() => this.handleMostViewedClick()}><Translate id="most viewed"></Translate></Button>
            <Button variant="success" className="Rankings-Button-MostRecommended" active={this.state.mostRecommended==true} onClick={() => this.handleMostRecommendedClick()}><Translate id="most recommended"></Translate></Button>
            <Button variant="success" className="Rankings-Button-MostBadges" active={this.state.mostBadges==true} onClick={() => this.handleMostBadgesClick()}><Translate id="most badges"></Translate></Button>
            
            { (this.state.mostViewed == true)?
                this.mostViewedTable():
                ((this.state.mostRecommended == true)?
                    this.mostRecommendedTable():(
                    (this.state.mostBadges == true)?
                        this.mostBadgesTable():
                        <></>))}
            </>
        )
    }
}



export default withLocalize(CreateProject);
