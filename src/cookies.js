// taken from https://www.quirksmode.org/js/cookies.html

var isCookieValid= (cookies,cookineame)=>{
	return (cookies[cookineame] != "undefined" && cookies[cookineame] != "" && cookies.hasOwnProperty(cookineame));
}
export default isCookieValid;