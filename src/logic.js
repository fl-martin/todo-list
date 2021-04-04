//TODOS FACTORY FUNCTION
const toDo = (name,date,description,priority,projectID,index) => {
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const getDate = ()=> date;
    const changeDate = (newDate)=> date = newDate; 
    const getDescription = ()=> description;
    const changeDescription = (newDescription)=> name = newDescription;
    const getPriority = ()=> priority;
    const changePriority = (newPriority)=> priority = newPriority; 
    const getProjectID = ()=> projectID;
    const changeProjectID = (newProjectID)=> projectID = newProjectID;
    let checkedState = false;
    const getCheckState = ()=> checkedState;
    const check = ()=> checkedState = !checkedState;
    const getIndex = ()=> index;
    return {getName, changeName, getDate, changeDate, getDescription, changeDescription, getPriority, getProjectID, changeProjectID, changePriority, getCheckState,check,getIndex}
}

//DELETE TODO
const deleteTodo = (index)=> {
    toDos[index] = '';
}

//ARRAY OF TODOS
const toDos = [];

//EACH NEW PROJECT CREATES A NEW ID, THE LINK BETWEEN PROJECTS AND TODOS
let projectIDgenerator = 0;

//PROJECTS FACTORY FUNCTION
const project = (name)=> {
    const id = projectIDgenerator;
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const projectToDos = ()=> toDos.filter(toDo=> toDo.getProject() == id);
    (()=> projectIDgenerator++)()
    return {getName, changeName, projectToDos}
}

//DELETE PROJECT

export {toDo,toDos, project,deleteTodo}