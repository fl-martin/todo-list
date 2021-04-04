import {toDoForm} from "./domManipulation.js"


//INITIALIZE IIFE
(function init() { 
    //create elements
    //add event listeners
    document.getElementById('content').appendChild(toDoForm());
})()

//CODIGO TEST
//console.log(projectIDgenerator);
//const proyecto = project('primera');
//onsole.log(projectIDgenerator);

//const tudu = toDo('fede','3','piola','baja','0');
//console.log(toDos[0].getName());
//console.log(toDos.length - 1);

// const node = displayDetails()

//document.getElementById('content').appendChild(toDoForm());
//console.table(proyecto.projectToDos());   //probar display de este array con todos cargados
