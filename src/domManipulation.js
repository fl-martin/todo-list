import {toDo,toDos,projects,createProject,deleteTodo,deleteProject} from "./logic.js"

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
    mid.value = 'low';
    high.value = 'high';
    lowLabel.htmlFor = 'low';
    lowLabel.textContent = 'Low';
    midLabel.htmlFor = 'mid';
    midLabel.textContent = 'Mid';
    highLabel.htmlFor = 'high';
    highLabel.textContent = 'High';   
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
        console.log(name.value);
        console.log(date.value);
        console.log(priority.value);
        console.log(projectID.value);
        if (name.value !== "" && date.value !== "" && priority.value !== undefined && projectID.value !== "") {   //FORM VALIDATION
            addToDo();
            checkNewTodoProject();
            iterateProjectsAndCheckbox(); 
            hideForm('form');
            clearForm();
        }
        else if (name.value == "" || date.value == "" || priority.value == undefined || projectID.value == "") {
            alert("Your new Todo needs more information : )");
        }
    });
    close.addEventListener('click',()=> {
        hideForm('form');
        clearForm();
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
    document.getElementById(formid).style.display = "flex";
}

//HIDE FORM
const hideForm = (formid)=> {
    document.getElementById(formid).style.display = "none";
}

//TAKES VALUES INSERTED BY USER TO CREATE NEW TODO AND PUSH IT TO THE ARRAY / CLEAR THE FORM
const addToDo = ()=> {   
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('form').elements['priority'].value;
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID; //ACCESS DATASET OF SELECTED OPTION
    toDos.push(toDo(name,date,description,priority,projectID));
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
    const checkDisplay = document.createElement('input');
    const details = document.createElement('button');
    const removeTodo = document.createElement('button');
    const editTodo = document.createElement('button');
    checkDisplay.type = 'checkbox';
    elementToDo.dataset.todoid = displayMe.getProjectID();
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    priorityDisplay.textContent = displayMe.getPriority();    //CAMBIAR POR COLOR
    projectDisplay.textContent = displayMe.getProjectID();    //NO
    checkDisplay.checked = displayMe.getCheckState();     //CAMBIAR POR SELECTOR GREEN/RED
    descriptionDisplay.style.display = 'none';
    editTodo.style.display = 'none';
    elementToDo.append(nameDisplay,dateDisplay,descriptionDisplay,priorityDisplay,projectDisplay,checkDisplay,details,removeTodo,editTodo);
    elementToDo.classList.add('defaultDisplay');
    checkDisplay.addEventListener('change',()=> displayMe.check())
    details.addEventListener('click',(e)=>{
        changeDisplayClass(e.target.parentNode);
        displayDescriptionEdit(e.target.parentNode);
    });
    removeTodo.addEventListener('click',()=>{
        deleteTodo(toDos.indexOf(displayMe));
        removeTodoElement(elementToDo);
    })
    return elementToDo;
}

//APPEND TODO
const appendTodo = (appendMe)=> {
    document.getElementById('todosList').appendChild(elementToDo(appendMe));
}

//REMOVE TODO ELEMENT
const removeTodoElement = (removeMe)=> {
    removeMe.parentNode.removeChild(removeMe);
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

const displayDescriptionEdit = (parentNode)=> {
    if(parentNode.classList.contains('defaultDisplay')) {
        parentNode.childNodes[2].style.display = 'none';  //DESCRIPTION
        parentNode.childNodes[8].style.display = 'none';  //EDIT BUTTON
    }
    else {
        parentNode.childNodes[2].style.display = 'block';
        parentNode.childNodes[8].style.display = 'block';
    } 
}

//PROJECT FORM
const projectForm = ()=> {
    const container = document.createElement('div');
    const textIndication = document.createElement('div');
    const nameInput = document.createElement('input');
    const create = document.createElement('button');
    const close = document.createElement('button');
    container.append(textIndication,nameInput,create,close);
    container.id = 'projectForm';
    create.addEventListener('click', ()=> {
        if (nameInput.value !== "") {                    //FORM VALIDATION
            createProject(nameInput.value);
            displayProject(projects[projects.length - 1]);    
            hideForm('projectForm');
            nameInput.value = '';
            iterateProjectsAndCheckbox();
        }
        else if (nameInput.value == "") {
            alert("Your new project needs a name : )");
        }               
    });
    close.addEventListener('click',hideForm.bind(this,'projectForm'));
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
    projectDisplay.parentNode.removeChild(projectDisplay);
    
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

export {projectForm,refreshProjects,displayProject,toDoForm,displayForm,hideForm,removeTodosElements}


//CORREGIR VALIDACION DE FORM.PRIORITY
//FORM INVALIDA: CAMBIAR CARTELITO SIMPATICO POR ADD CLASS INVALID, SEGUIR CON QUE INFO MOSTRAR DE CADA TODO, CSS