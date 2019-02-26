import React, { Component } from 'react';
import './App.css'
import Menu from './Components/Menu/Menu';
import Main from './Components/Main/Main';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
import gbTranslation from "./Resources/Translations/gb.json";
import ptTranslation from "./Resources/Translations/pt.json";
import {eraseCookie,readCookie,createCookie} from "./cookies.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.props.initialize({
      languages: [
        { name: "English", code: "gb" },
        { name: "Português", code: "pt" }
      ],
      options: { defaultLanguage: "gb",
      renderToStaticMarkup: renderToStaticMarkup }
      
    });
    this.props.addTranslationForLanguage(gbTranslation,"gb");
    this.props.addTranslationForLanguage(ptTranslation,"pt");
    this.state = {
      currentLanguage: "gb",
      currentLanguageName:"English"
    };
    if(readCookie("folyou_language") != ""){
      this.changeCurrentLanguage(readCookie("folyou_language"),readCookie("folyou_languageName"));
    }else{
      this.changeCurrentLanguage(this.state.currentLanguage,this.state.currentLanguageName);
    }
  }
  changeCurrentLanguage(code,name) {
    this.setState({ currentLanguage: code,currentLanguageName:name });
    createCookie("folyou_language",this.state.currentLanguage);
    createCookie("folyou_languageName",this.state.currentLanguageName);
  }

  render() {
    return (
      <div>
          <Menu app={this}/>
          <Main/>
          </div>
    );
  }
}

export default withLocalize(App);
