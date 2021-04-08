import {initialDom, defaultProject} from "./domOnLoad"


//INITIALIZE IIFE
(function init() { 
    //add event listeners por separado?
    initialDom();
    defaultProject();
})()


