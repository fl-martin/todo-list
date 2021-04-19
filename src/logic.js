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

//DELETE TODO
const deleteTodo = (index)=> {
    toDos.splice(index,1);
}

//TODOS AND PROJECTS ARRAYS
const toDos = [];
const projects = [];

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
}

//DELETE PROJECT
const deleteProject = (project)=> {
    const indexToDelete = projects.indexOf(project);
    projects.splice(indexToDelete,1);
}

export {toDo,toDos,projects,createProject,deleteTodo,deleteProject}