import React from 'react'
import Home from '@material-ui/icons/Home';
import Star from '@material-ui/icons/Star';
import People from '@material-ui/icons/People';
import Description from '@material-ui/icons/Description';
import Rankings from '../Pages/RankingsView/Rankings';
import Collections from '@material-ui/icons/Collections';
export default
[
    {
        "icon" : <Home></Home>,
        "page" : "Home",
        "link" : "/",

    },
    {
        "icon" : <Collections></Collections>,
        "page" : "Portfolios",
        "link" : "/Portfolios",
        
    },
    {
        "icon" : <Description></Description>,
        "page" : "Proposals",
        "link" : "/Proposals",
        
    },
    {
        "icon" : <People></People>,
        "page" : "Talents",
        "link" : "/Talents",
        
    },
    {
        "icon" : <Star></Star>,
        "page" : "Rankings",
        "link" : "/Rankings",
        
    },

]