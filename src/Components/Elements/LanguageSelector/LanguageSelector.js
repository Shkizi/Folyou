import React from "react";
import { withLocalize } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"; 
import { Image,Dropdown } from "react-bootstrap";
import './LanguageSelector.css'

const LanguageSelector = ({ languages, app, setActiveLanguage }) => (
   <Dropdown drop="left" >
     <Dropdown.Toggle id="dropdown-custom-1" className="Dropdown-Language-Select" variant="link">
     {app.state.currentLanguageName}
     </Dropdown.Toggle>
      <Dropdown.Menu className="Dropdown-Language-Menu">
       {languages.map(lang => (
        <Dropdown.Item className="Dropdown-Language-Selector" key={lang.code} onClick={() =>{ setActiveLanguage(lang.code); app.changeCurrentLanguage(lang.code,lang.name)}}>
            <Image src={getImageLanguage(lang.code)} className="Dropdown-Language-Flag"></Image>
            &nbsp;{lang.name}   
        </Dropdown.Item>
    ))}
    </Dropdown.Menu>
    </Dropdown>
  
);

export default withLocalize(LanguageSelector);
