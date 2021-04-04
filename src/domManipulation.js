import {toDo, toDos, project,deleteTodo} from "./logic.js"

//FORM TO CREATE TODO
const toDoForm = ()=> {
    const form = document.createElement('form');
    const name = document.createElement('input');
    const date = document.createElement('input');
    const description = document.createElement('input');
    const priority = document.createElement('input');
    const projectID = document.createElement('input'); //que sea menu desplegable mostrando los distintos proyectos como opcion
    const add = document.createElement('button');
    //BUTTON CLOSE FORM
    form.append(name,date,description,priority,projectID,add);
    name.id = 'name';
    date.id = 'date';
    description.id = 'description';
    priority.id = 'priority';
    projectID.id = 'projectID';
    add.id = 'add';
    add.type = 'button';
    add.addEventListener('click',()=> {
        addToDo();
        form.style.display = "none";
        clearForm();
        console.log(toDos[toDos.length - 1].getName());   //TEST IF ADDED TO TODOS CORRECTLY
    });
    form.id = 'form';
    return form;
}

//TAKE VALUES INSERTED BY USER TO CREATE NEW TODO AND PUSH IT TO THE ARRAY, CLEAR THE FORM
const addToDo = ()=> {   
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const projectID = document.getElementById('projectID').value;
    const index = toDos.length;
    toDos.push(toDo(name,date,description,priority,projectID,index));
    document.getElementById('content').appendChild(elementToDo(toDos[toDos.length - 1]))
}

const clearForm = ()=> {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('projectID').value = '';
}

//TAKES A TODO AND GENERATES AN ELEMENT TO DISPLAY
const elementToDo = (displayMe)=> {
    const elementToDo = document.createElement('div');
    const nameDisplay = document.createElement('div');
    const dateDisplay = document.createElement('div');
    const descriptionDisplay = document.createElement('div');
    const priorityDisplay = document.createElement('div');
    const projectDisplay = document.createElement('div');
    const checkDisplay = document.createElement('div');
    const details = document.createElement('button');
    const removeTodo = document.createElement('button');
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    priorityDisplay.textContent = displayMe.getPriority();
    projectDisplay.textContent = displayMe.getProjectID();
    checkDisplay.textContent = displayMe.getCheckState();
    elementToDo.append(nameDisplay,dateDisplay,descriptionDisplay,priorityDisplay,projectDisplay,checkDisplay,details,removeTodo);
    elementToDo.classList.add('defaultDisplay');
    details.addEventListener('click',(e)=>{
        changeDisplay(e.target.parentNode);
    });
    removeTodo.addEventListener('click',()=>{
        deleteTodo(displayMe.getIndex());
        elementToDo.parentNode.removeChild(elementToDo);
    })
    return elementToDo;
}

//CLASSES CHANGE THE SIZE AND CONTENT OF EACH TODO DISPLAY
const changeDisplay = (parentNode)=> {
   parentNode.classList.toggle('defaultDisplay');
   parentNode.classList.toggle('detailDisplay');
}

//DISPLAY PROJECT
const toogleDisplayProject = (project)=> {
    const toDos = project.projectToDos();
    toDos.forEach(todo => {
        todo.style.display = "flex" ? todo.style.display = "none" : todo.style.display = "flex"
    });
}

export {toDoForm,changeDisplay,toogleDisplayProject}