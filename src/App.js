import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import Main from './Components/Main/Main';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
import gbTranslation from "./Resources/Translations/gb.json";
import ptTranslation from "./Resources/Translations/pt.json";

import ReactLoading from 'react-loading';


import { withCookies } from 'react-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.props.initialize({
      languages: [
        { name: "English", code: "gb" },
        { name: "Português", code: "pt" }
      ],
      options: { defaultLanguage: (cookies.get("folyou_language") != "undefined" && cookies.get("folyou_language") != "")?cookies.get("folyou_language"):"gb",
      renderToStaticMarkup: renderToStaticMarkup }
      
    });
    this.props.addTranslationForLanguage(gbTranslation,"gb");
    this.props.addTranslationForLanguage(ptTranslation,"pt");
    
    this.state = {
      currentLanguage: "gb",
      currentLanguageName:"English",
      notificationModule:null,
      isLoading:true,
    };
  }

  
  changeCurrentLanguage(code,name) {
    this.setState({ currentLanguage: code,currentLanguageName:name });
    const { cookies } = this.props;
    cookies.set('folyou_language', code, { path: '/' });
    cookies.set('folyou_languageName', name, { path: '/' });

  }

  componentDidMount() {
    const { cookies } = this.props;
  
    if(cookies.get("folyou_language") != "undefined" && cookies.get("folyou_language") != ""){
      this.changeCurrentLanguage(cookies.get("folyou_language"),cookies.get("folyou_languageName"));
     
    }else{
      this.changeCurrentLanguage(this.state.currentLanguage,this.state.currentLanguageName);
    }
    //setTimeout(()=>{ this.setState({isLoading: false}) }, 1300);//time delay for the loading
    this.setState({isLoading: false});//time delay for the loading
    var raisenotif= (name,position,type,icony) => this.state.notificationModule.notify(name,position,type,5,icony);
    //raisenotif("Tset","bl",1);
  }


  loadingSection = () => {return(<ReactLoading type={"bars"} color={"red"} height={'20%'} width={'20%'} />)}

  Page = () => {return(
  
    <div>     
    <Menu app={this} cookies={this.props.cookies}/>
    <Main app={this} cookies={this.props.cookies}/>
    </div>
    )}

  


  render() {

    
    return (

        <div>
          {(this.state.isLoading)?this.loadingSection():this.Page()}
        </div>

      

    );
  }
}

export default withCookies(withLocalize(App));
