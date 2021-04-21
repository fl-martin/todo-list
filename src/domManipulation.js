import { format } from 'date-fns';

import {toDo,toDos,projects,createProject,deleteTodo,deleteProject,addToDo} from "./logic.js";

//FORM TO CREATE TODO
const toDoForm = ()=> {
    const form = document.createElement('form');
    const name = document.createElement('input');
    const date = document.createElement('input');
    const description = document.createElement('input');
    const priority = document.createElement('div');
    const low = document.createElement('input');
    const lowLabel = document.createElement('label');
    const mid = document.createElement('input');
    const midLabel = document.createElement('label');
    const high = document.createElement('input');
    const highLabel = document.createElement('label');
    const projectID = document.createElement('select');
    const add = document.createElement('button');
    const close = document.createElement('button');
    date.type = 'date';
    low.type = 'radio';
    mid.type = 'radio';
    high.type = 'radio';
    low.name = 'priority';
    mid.name = 'priority';
    high.name = 'priority';
    low.value = 'low';
    mid.value = 'mid';
    high.value = 'high';
    lowLabel.htmlFor = 'lowPriority';
    lowLabel.textContent = 'Want';
    midLabel.htmlFor = 'midPriority';
    midLabel.textContent = 'Have';
    highLabel.htmlFor = 'highPriority';
    highLabel.textContent = 'Must';   
    name.placeholder = "Title";
    description.placeholder = 'Description';
    projectID.placeholder = 'Project';
    add.textContent = 'Add';
    close.textContent = 'X';
    priority.append(low,lowLabel,mid,midLabel,high,highLabel);
    form.append(name,date,description,priority,projectID,add,close);
    form.id = 'form';
    name.id = 'name';
    date.id = 'date';
    description.id = 'description';
    priority.id = 'priority';
    low.id = 'lowPriority';
    mid.id = 'midPriority';
    high.id = 'highPriority';
    projectID.id = 'projectID';
    add.id = 'addToDo';
    close.id = 'closeForm';
    add.type = 'button';
    close.type = 'button';
    add.addEventListener('click',()=> {
        if (name.value !== "" && date.value !== "" && form.elements['priority'].value !== "" && projectID.value !== "") {   //FORM VALIDATION            
            addToDo();
            checkNewTodoProject();
            appendTodo(toDos[toDos.length - 1]); 
            blurEffect();
            hideForm('form');
            clearForm();
        }
        else if (name.value == "" || date.value == "" || priority.value == undefined || projectID.value == "") {
            alert("Looks like your new Todo it's incomplete : o");
        }
    });
    close.addEventListener('click',()=> {
        hideForm('form');
        clearForm();
        blurEffect();
    });
    return form;
}

//REFRESH PROJECT OPTIONS, STORE PROJECT ID
const refreshProjects = ()=> {
    document.getElementById('projectID').options.length = projects.length;
    for(let i = 0; i < projects.length; i++) {
        document.getElementById('projectID').options[i].textContent = projects[i].getName();
        document.getElementById('projectID').options[i].dataset.projectID = projects[i].getID();
    }
}

//DISPLAY FORM
const displayForm = (formid)=> {
    const el = document.getElementById(formid);
    var seconds = 500/1000;
    document.getElementById(formid).style.display = "flex";
    setTimeout(function() {
        el.style.transition = "opacity "+seconds+"s ease";
        el.style.opacity = 1;
    }, 500);
}

//HIDE FORM
const hideForm = (formid)=> {
    const el = document.getElementById(formid);
    var seconds = 300/1000;
    el.style.transition = "opacity "+seconds+"s ease";
    el.style.opacity = 0;
    setTimeout(function() {
    document.getElementById(formid).style.display = "none";
    }, 500);
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
    const projectDisplay = document.createElement('div');
    const switcher = document.createElement('label');
    const checkDisplay = document.createElement('input');
    const sliderRound = document.createElement('span');
    const details = document.createElement('button');
    const removeTodo = document.createElement('button');
    checkDisplay.type = 'checkbox';
    elementToDo.dataset.todoid = displayMe.getProjectID();
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    projectDisplay.textContent = projects.filter(project => project.getID() == displayMe.getProjectID())[0].getName()
    elementToDo.style.backgroundColor =  todoBackgroundColor(elementToDo,displayMe.getCheckState(),displayMe)
    checkDisplay.checked = displayMe.getCheckState();
    descriptionDisplay.style.display = 'none';
    details.textContent = '+ info';
    removeTodo.textContent = 'X'
    switcher.append(checkDisplay,sliderRound);
    elementToDo.append(nameDisplay,dateDisplay,projectDisplay,switcher,details,descriptionDisplay,removeTodo);
    switcher.classList.add('switch');
    sliderRound.classList.add('slider','sliderRound');
    elementToDo.classList.add('defaultDisplay');
    descriptionDisplay.classList.add('description');
    checkDisplay.addEventListener('change',()=> {
        displayMe.check()
        todoBackgroundColor(elementToDo,displayMe.getCheckState(),displayMe)
    })
    details.addEventListener('click',(e)=>{
        changeDisplayClass(e.target.parentNode);
        displayDescription(e.target.parentNode);
        infoText(details);
    });
    removeTodo.addEventListener('click',()=>{
        deleteTodo(toDos.indexOf(displayMe));
        removeTodoElement(elementToDo);
    })
    return elementToDo;
}

//TODO BACKGROUND DEFINED BY PRIORITY
const priorityColor = (priority)=> {
    let color;
    switch (priority) {
        case 'low':
            color = 'rgb(245, 221, 66)';
        break;
        case 'mid':
            color = 'rgb(245, 164, 66)';
        break;
        case 'high':
            color = 'rgb(245, 87, 66)';
        break;
    }
    return color
}

//GREEN BACKGROUND IF CHECKED
const todoBackgroundColor = (elementTodo,checkedState,displayMe)=> {
    if (checkedState) elementTodo.style.backgroundColor = "rgb(108, 255, 79)";
    else if (!checkedState) elementTodo.style.backgroundColor = priorityColor(displayMe.getPriority());
}

//APPEND TODO
const appendTodo = (appendMe)=> {
    const el = elementToDo(appendMe);
    var seconds = 500/1000;
    el.style.opacity = 0;
    document.getElementById('todosList').appendChild(el);
    setTimeout(function() {
        el.style.opacity = 1;
    });
}

//REMOVE TODO ELEMENT
const removeTodoElement = (removeMe)=> {
    var seconds = 300/1000;
    removeMe.style.opacity = 0;
    setTimeout(function() {
        removeMe.parentNode.removeChild(removeMe);
    }, 500);

}

//REMOVE ALL TODOS ELEMENTS
const removeTodosElements = (list)=> {
    let i = 0;
    while (i < list.length) {
        removeTodoElement(list[i]);
        i++;
    }
}

//CLASSES CHANGE THE SIZE AND CONTENT OF EACH TODO DISPLAY
const changeDisplayClass = (parentNode)=> {
   parentNode.classList.toggle('defaultDisplay');
   parentNode.classList.toggle('detailDisplay');
}

const displayDescription = (parentNode, descriptionElement)=> {       //cambiar por append y remove
    if(parentNode.classList.contains('defaultDisplay')) {                //si no esta el elemento,
        parentNode.childNodes[5].style.display = 'none';                //append
    }
    else {
        parentNode.childNodes[5].style.display = 'block';               //erem
    } 
}

const infoText = (element)=> {
    if (element.textContent == '+ info') element.textContent = '- info';
    else if (element.textContent == '- info') element.textContent = '+ info'
}

//PROJECT FORM
const projectForm = ()=> {
    const container = document.createElement('div');
    const textIndication = document.createElement('div');
    const nameInput = document.createElement('input');
    const create = document.createElement('button');
    const close = document.createElement('button');
    nameInput.placeholder = 'Name';
    create.textContent = 'Create';
    close.textContent = 'X';
    container.append(textIndication,nameInput,create,close);
    container.id = 'projectForm';
    create.addEventListener('click', ()=> {
        if (nameInput.value !== "") {                    //FORM VALIDATION
            createProject(nameInput.value);
            displayProject(projects[projects.length - 1]);    
            hideForm('projectForm');
            nameInput.value = '';
            blurEffect();
            iterateProjectsAndCheckbox();
        }
        else if (nameInput.value == "") {
            alert("Your new project needs a name : )");
        }               
    });
    close.addEventListener('click',()=> {
        blurEffect();
        hideForm('projectForm');
    });
    return container
}

//UPDATE PROJECT LIST
const checkNewTodoProject = ()=> {
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID;
    const checkbox = document.querySelector(`div[data-projectid = "${projectID}"]`).childNodes[1];
    if (checkbox.checked == false) checkbox.checked = true;
}

//REMOVE PROJECT 
const removeProject = (projectDisplay)=> {
    var seconds = 300/1000;
    projectDisplay.style.opacity = 1;
    projectDisplay.style.transition = "opacity "+seconds+"s ease";
    projectDisplay.style.opacity = 0;
    setTimeout(function() {
        projectDisplay.parentNode.removeChild(projectDisplay);
    }, 500);
}

//PROJECT LIST
const displayProject = (project)=> {
    const projectDisplay = document.createElement('div');
    const projectName = document.createElement('div');
    const displayCheckbox = document.createElement('input');
    const remove = document.createElement('button');
    projectDisplay.dataset.projectid = project.getID();
    displayCheckbox.type = 'checkbox';
    projectName.textContent = project.getName();
    remove.textContent = 'X';
    projectName.classList.add('projectName');
    projectDisplay.classList.add('projectDisplay');
    displayCheckbox.classList.add('displayCheckbox');
    displayCheckbox.addEventListener('change',extractTodosIDCheckboxState.bind(this,project,displayCheckbox));
    remove.addEventListener('click',()=> {
        removeProject(projectDisplay);
        deleteProject(project);
        removeTodosElements(document.querySelectorAll(`div[data-todoid = "${project.getID()}"]`));     //BORRAR TODOS DE PROJECT DELETEA2
    });
    projectDisplay.append(projectName,displayCheckbox,remove);
    document.getElementById('projectsList').appendChild(projectDisplay);
}

//EXTRACT PROJECT TODOS AND INFO
const extractTodosIDCheckboxState = (project,displayCheckbox)=> {
    const toDos = project.projectToDos();
    const projectID = project.getID();
    const checkboxState = displayCheckbox.checked;
    toggleTodosDisplay(toDos,checkboxState,projectID);
}

//TOGGLE TODOS DISPLAY
const toggleTodosDisplay = (toDos,checkboxState,projectID)=> {
    if (checkboxState) {
        toDos.forEach(todo => {
            appendTodo(todo);
        });
    }
    else if (!checkboxState) {
        const listToRemove = document.querySelectorAll(`div[data-todoid = "${projectID}"]`);
        let i = 0;
        while (i < listToRemove.length) {
            removeTodoElement(listToRemove[i]);
            i++;
        }
    }
    
}

//ITERATE OVER PROJECTS AND CHECKBOX
const iterateProjectsAndCheckbox = ()=> {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const projectID = projects[i].getID();
        const checkbox = document.querySelector(`div[data-projectid = "${projectID}"]`).childNodes[1];
        extractTodosIDCheckboxState(project,checkbox);
    }
}

//BLUR EFFECT
const blurEffect = ()=> {
    document.getElementById('content').classList.toggle('blurred');

}

export {projectForm,refreshProjects,displayProject,toDoForm,displayForm,hideForm,removeTodosElements, blurEffect}

//unificar append y removes en una sola funcion, queda pendiente append project
//enchular buttons, description como lo mostramos?
//local storage