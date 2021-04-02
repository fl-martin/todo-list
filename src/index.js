//FACTORY FUNCTION
const toDo = (name,date,description,priority,projectID) => {
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const getDate = ()=> date;
    const changeDate = (newDate)=> date = newDate; 
    const getDescription = ()=> description;
    const changeDescription = (newDescription)=> name = newDescription;
    const getPriority = ()=> priority;
    const changePriority = (newPriority)=> priority = newPriority; 
    const getProject = ()=> projectID;
    const changeProject = (newProject)=> project = newProject;
    let checkedState = false;
    const getCheckState = ()=> checkedState;
    const check = ()=> checkedState = !checkedState;
    return {getName, changeName, getDate, changeDate, getDescription, changeDescription, getPriority, getProject, changeProject, changePriority, getCheckState, check}
}
//ARRAY OF TODOS
const toDos = [];

//FORM TO CREATE TODO
const toDoForm = ()=> {
    const form = document.createElement('form');
    const name = document.createElement('input');
    const date = document.createElement('input');
    const description = document.createElement('input');
    const priority = document.createElement('input');
    const projectID = document.createElement('input'); //que sea menu desplegable mostrando los distintos proyectos como opcion
    const add = document.createElement('button');
    form.append(name,date,description,priority,projectID,add);
    name.id = 'name';
    date.id = 'date';
    description.id = 'description';
    priority.id = 'priority';
    projectID.id = 'project';
    add.id = 'add';
    add.type = 'button';
    add.addEventListener('click',()=> {
        addToDo();
        clearForm()
    });
    form.classList.add('form');
    return form;
}

//TAKE VALUES INSERTED BY USER TO CREATE NEW TODO AND PUSH IT TO THE ARRAY, CLEAR THE FORM
const addToDo = ()=> {   
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const projectID = document.getElementById('project').value;
    toDos.push(toDo(name,date,description,priority,projectID));
}

const clearForm = ()=> {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('project').value = '';
}

//EACH NEW PROJECT CREATES A NEW ID, THE LINK BETWEEN PROJECTS AND TODOS
let projectIDgenerator = 0

//FACTORY FUNCTION
const project = (name)=> {
    const id = projectIDgenerator;
    const getName = ()=> name;
    const changeName = (newName)=> name = newName;
    const projectToDos = ()=> toDos.filter(toDo=> toDo.getProject() == id);
    (()=> projectIDgenerator++)()
    return {getName, changeName, projectToDos}
}

//TAKES A TODO AND GENERATES AN ELEMENT TO DISPLAY
const displayToDo = (displayMe)=> {
    const toDoDisplay = document.createElement('div');
    const nameDisplay = document.createElement('div');
    const dateDisplay = document.createElement('div');
    const descriptionDisplay = document.createElement('div');
    const priorityDisplay = document.createElement('div');
    const projectDisplay = document.createElement('div');
    const checkDisplay = document.createElement('div');
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    priorityDisplay.textContent = displayMe.getPriority();
    projectDisplay.textContent = displayMe.getProject();
    checkDisplay.textContent = displayMe.getCheckState();
    toDoDisplay.append(nameDisplay,dateDisplay,descriptionDisplay,priorityDisplay,projectDisplay,checkDisplay);
    return toDoDisplay;
}




//CODIGO TEST
//console.log(projectIDgenerator);
//const proyecto = project('primera');
//onsole.log(projectIDgenerator);

//const tudu = toDo('fede','3','piola','baja','0');
//onsole.log(toDos[0].getName());
//console.log(tudu.getName());

// const node = displayToDo()

//document.getElementById('content').appendChild(toDoForm());
//console.table(proyecto.projectToDos());   //probar display de este array con todos cargados
