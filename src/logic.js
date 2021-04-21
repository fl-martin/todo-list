//TODOS AND PROJECTS ARRAYS
let storedToDos = JSON.parse(localStorage.getItem("storedToDos") || "[]");
const toDos = [];
const projects = [];

//LOAD LOCALSTORAGE      //metodos nos son serializables, crear array con objectos con propiedades determinadas por el form? para guardar en localstorage y al getitem volver a crear todos con dichos valores
/*if (storedToDos != []) {
    console.log(storedToDos);
    for (let i = 0; i < storedToDos.length; i++) {
        toDos.push(storedToDos[i]);
    }
    console.log(toDos[0]);
}*/

//TODOS FACTORY FUNCTION
const toDo = (name,date,description,priority,projectID) => {
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const getDate = ()=> date;
    const changeDate = (newDate)=> date = newDate; 
    const getDescription = ()=> {
        if(description != "") return description;
        else if (description == "") return "No description included";
    }
    const changeDescription = (newDescription)=> name = newDescription;
    const getPriority = ()=> priority;
    const changePriority = (newPriority)=> priority = newPriority; 
    const getProjectID = ()=> projectID;
    const changeProjectID = (newProjectID)=> projectID = newProjectID;
    let checkedState = false;
    const getCheckState = ()=> checkedState;
    const check = ()=> checkedState = !checkedState;
    return {getName, changeName, getDate, changeDate, getDescription, changeDescription, getPriority, getProjectID, changeProjectID, changePriority, getCheckState,check}
}

//TAKES VALUES INSERTED BY USER TO CREATE NEW TODO AND PUSH IT TO THE ARRAY / CLEAR THE FORM
const addToDo = ()=> {   
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('form').elements['priority'].value;
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID; //ACCESS DATASET OF SELECTED OPTION
    toDos.push(toDo(name,date,description,priority,projectID));
    window.localStorage.setItem('storedToDos',JSON.stringify(toDos));
}

//DELETE TODO
const deleteTodo = (index)=> {
    toDos.splice(index,1);
    window.localStorage.setItem('storedToDos',JSON.stringify(toDos));
}

//FOR EACH NEW PROJECT A NEW ID IS GENERATED. THE LINK BETWEEN PROJECTS AND TODOS
let projectIDgenerator = 0;

//PROJECTS FACTORY FUNCTION
const project = (name)=> {
    const id = projectIDgenerator;
    const getID = ()=> id;
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const projectToDos = ()=> toDos.filter(toDo=> toDo.getProjectID() == id);
    (()=> projectIDgenerator++)();
    return {getID, getName, changeName, projectToDos}
}

//CREATE PROJECT
const createProject = (name)=> {
    projects.push(project(name));
    window.localStorage.setItem('projects',JSON.stringify(projects));
}

//DELETE PROJECT
const deleteProject = (project)=> {
    const indexToDelete = projects.indexOf(project);
    projects.splice(indexToDelete,1);
    window.localStorage.setItem('projects',JSON.stringify(projects));
}

export {toDo,toDos,projects,createProject,deleteTodo,deleteProject,addToDo}