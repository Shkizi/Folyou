import React, { Component } from 'react';
import './App.css'
import Menu from './Components/Menu/Menu';
import Main from './Components/Main/Main';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
import gbTranslation from "./Resources/Translations/gb.json";
import ptTranslation from "./Resources/Translations/pt.json";

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
      currentLanguageName:"English"
    };
    if(cookies.get("folyou_language") != "undefined" && cookies.get("folyou_language") != ""){
      this.changeCurrentLanguage(cookies.get("folyou_language"),cookies.get("folyou_languageName"));
     
    }else{
      this.changeCurrentLanguage(this.state.currentLanguage,this.state.currentLanguageName);
    }
  }
  changeCurrentLanguage(code,name) {
    this.setState({ currentLanguage: code,currentLanguageName:name });
    const { cookies } = this.props;
    cookies.set('folyou_language', code, { path: '/' });
    cookies.set('folyou_languageName', name, { path: '/' });

  }

  render() {
    return (
      <div>
          <Menu app={this} cookies={this.props.cookies}/>
          <Main/>
          </div>
    );
  }
}

export default withCookies(withLocalize(App));
