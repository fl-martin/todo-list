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
    lowLabel.htmlFor = 'lowPriority';
    lowLabel.textContent = 'Low';
    midLabel.htmlFor = 'midPriority';
    midLabel.textContent = 'Mid';
    highLabel.htmlFor = 'highPriority';
    highLabel.textContent = 'High';   
    name.placeholder = "Title";
    description.placeholder = 'Description';
    projectID.placeholder = 'Project';
    add.textContent = 'Add';
    close.textContent = 'Close';
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
            iterateProjectsAndCheckbox(); 
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
    const projectDisplay = document.createElement('div');
    const switcher = document.createElement('label');
    const checkDisplay = document.createElement('input');
    const sliderRound = document.createElement('span');
    const details = document.createElement('button');
    const removeTodo = document.createElement('button');
    const editTodo = document.createElement('button');
    checkDisplay.type = 'checkbox';
    elementToDo.dataset.todoid = displayMe.getProjectID();
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    projectDisplay.textContent = projects.filter(project => project.getID() == displayMe.getProjectID())[0].getName()
    elementToDo.style.backgroundColor =  todoBackgroundColor(elementToDo,displayMe.getCheckState(),displayMe)
    checkDisplay.checked = displayMe.getCheckState();
    descriptionDisplay.style.display = 'none';
    editTodo.style.display = 'none';
    details.textContent = '+ info';
    removeTodo.textContent = 'X'
    switcher.append(checkDisplay,sliderRound);
    elementToDo.append(nameDisplay,dateDisplay,descriptionDisplay,projectDisplay,switcher,details,removeTodo,editTodo);
    switcher.classList.add('switch');
    sliderRound.classList.add('slider','sliderRound');
    elementToDo.classList.add('defaultDisplay');
    checkDisplay.addEventListener('change',()=> {
        displayMe.check()
        todoBackgroundColor(elementToDo,displayMe.getCheckState(),displayMe)
    })
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

//TODO BACKGROUND DEFINED BY PRIORITY
const priorityColor = (priority)=> {
    let color;
    switch (priority) {
        case 'low':
            color = 'yellow';
        break;
        case 'mid':
            color = 'orange';
        break;
        case 'high':
            color = 'red';
        break;
    }
    return color
}

//GREEN BACKGROUND IF CHECKED
const todoBackgroundColor = (elementTodo,checkedState,displayMe)=> {
    if (checkedState) elementTodo.style.backgroundColor = "green";
    else if (!checkedState) elementTodo.style.backgroundColor = priorityColor(displayMe.getPriority());
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
    nameInput.placeholder = 'Name';
    create.textContent = 'Create';
    close.textContent = 'Close';
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
    remove.textContent = 'X';
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


//FORM INVALIDA: CAMBIAR CARTELITO SIMPATICO POR ADD CLASS INVALID¿?
//OVERFLOW HORIZONTAL?
//arreglar error al cambiar diplay detail del element todo
//CREAR EFFECT BLUR PARA CUANDO APARECER LAS FORMS, agregar clase no blur a las forms, fijarse bien el selector query