import React from "react";
import { withLocalize } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"; 
import { Image,Dropdown } from "react-bootstrap";
import './LanguageSelector.css'
import { withCookies } from 'react-cookie';
const LanguageSelector = ({ languages, app, setActiveLanguage, cookies }) => (
   <Dropdown drop="left" >
     <Dropdown.Toggle id="dropdown-custom-1" className="Dropdown-Language-Select" variant="link">
     <Image src={getImageLanguage(cookies.get("folyou_language"))} style={{width:"25px",height:"25px"}}></Image> {cookies.get("folyou_languageName")}
     </Dropdown.Toggle>
      <Dropdown.Menu className="Dropdown-Language-Menu">
       {languages.map(lang => (
        <Dropdown.Item className="Dropdown-Language-Selector" data-locale={lang.code} key={lang.code} onClick={() =>{ setActiveLanguage(lang.code); app.changeCurrentLanguage(lang.code,lang.name)}}>
            <Image src={getImageLanguage(lang.code)} className="Dropdown-Language-Flag"></Image>
            &nbsp;{lang.name}   
        </Dropdown.Item>
    ))}
    </Dropdown.Menu>
</Dropdown>
  
);

export default withCookies(withLocalize(LanguageSelector));
