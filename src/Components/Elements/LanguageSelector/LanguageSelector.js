import React from "react";
import { withLocalize } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"; 
import { Image,Dropdown } from "react-bootstrap";

const LanguageSelector = ({ languages, app, setActiveLanguage }) => (
    <Dropdown>
   <Dropdown.Toggle id="dropdown-custom-1">{app.state.currentLanguageName}</Dropdown.Toggle>
    <Dropdown.Menu className="super-colors">
    {languages.map(lang => (
        <Dropdown.Item key={lang.code} onClick={() =>{ setActiveLanguage(lang.code); app.changeCurrentLanguage(lang.code,lang.name)}}>
            <Image src={getImageLanguage(lang.code)}></Image>
            {lang.name}   
        </Dropdown.Item>
    ))}
    </Dropdown.Menu>
    </Dropdown>
  
);

export default withLocalize(LanguageSelector);
