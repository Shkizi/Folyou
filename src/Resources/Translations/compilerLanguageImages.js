import ptImage from "../IMG/country_flag/4x3/pt.svg"
import gbImage from "../IMG/country_flag/4x3/gb.svg"

 
function getImageLanguage(code){
    switch (code){
        case "pt": return ptImage;
        case "gb": return gbImage;
        default : return "Not supported";
    }

    
}

export default getImageLanguage;