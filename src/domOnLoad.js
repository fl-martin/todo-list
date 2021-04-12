import {toDoForm, projectForm, projectList, displayForm, refreshProjects, removeAllTodosElements } from "./domManipulation";
import {createProject} from "./logic";

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
    projectsMenu.id = 'projectsMenu';
    projectsList.id = 'projectsList';
    newProject.id = 'newProject';
    todosView.id = 'todosView';
    todosList.id = 'todosList';
    addNew.id = "addNew";
    projectsMenu.append(projectsH,projectsList,newProject);
    todosView.append(todosList,addNew);
    mainContent.append(projectsMenu,todosView);
    document.getElementById('content').append(banner,mainContent,footer,toDoForm(),projectForm());
    newProject.addEventListener('click',()=> {
        removeAllTodosElements();
        displayForm('projectForm');
    });
    addNew.addEventListener('click',()=> {
        removeAllTodosElements();
        refreshProjects();
        displayForm('form');
    })
}

export const defaultProject = ()=> {
    createProject("myList");
    projectList();
}
