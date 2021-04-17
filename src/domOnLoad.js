import { add } from "date-fns";
import {toDoForm, projectForm, displayProject, displayForm,hideForm, refreshProjects, removeTodosElements, blurEffect} from "./domManipulation";
import {createProject,projects} from "./logic";

export const initialDom = ()=> {
    const banner = document.createElement('header');
    const mainContent = document.createElement('main');
    const projectsMenu = document.createElement('nav');
    const projectsH = document.createElement('h1');
    const newProject = document.createElement('button');
    const projectsList = document.createElement('div');
    const todosView = document.createElement('div');
    const todosList = document.createElement('div');
    const addNew = document.createElement('button');
    const footer = document.createElement('footer');
    const madeBy = document.createElement('div');
    const githubLink = document.createElement('a');
    mainContent.id = 'mainContent';
    banner.id = 'banner';
    projectsMenu.id = 'projectsMenu';
    projectsList.id = 'projectsList';
    newProject.id = 'newProject';
    todosView.id = 'todosView';
    todosList.id = 'todosList';
    addNew.id = "addNew";
    footer.id = 'footer';
    banner.textContent = 'todoList';
    newProject.textContent = 'New project';
    addNew.textContent = 'Add';
    madeBy.textContent = 'Made by ';
    githubLink.textContent = 'fl-martin';
    githubLink.href = 'https://github.com/fl-martin';   
    projectsMenu.append(projectsH,projectsList,newProject);
    todosView.append(todosList,addNew);
    mainContent.append(projectsMenu,todosView);
    madeBy.appendChild(githubLink);
    footer.appendChild(madeBy);
    document.getElementById('content').append(banner,mainContent,footer);
    document.querySelector('body').append(toDoForm(),projectForm());
    newProject.addEventListener('click',()=> {
        removeTodosElements(document.getElementById('todosList').childNodes);
        blurEffect();
        hideForm('form');
        displayForm('projectForm');
    });
    addNew.addEventListener('click',()=> {
        removeTodosElements(document.getElementById('todosList').childNodes);
        //blur EFFECT
        refreshProjects();
        blurEffect();
        hideForm('projectForm');
        displayForm('form');
    })
}

export const defaultProject = ()=> {
    createProject("myList");
    displayProject(projects[projects.length - 1]);
}
