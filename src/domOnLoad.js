import { toDoForm, displayForm } from "./domManipulation";

export const initialDom = ()=> {
    const banner = document.createElement('header');
    const mainContent = document.createElement('main');
    const projectsMenu = document.createElement('nav');
    const projectsH = document.createElement('h1');
    const newProject = document.createElement('button');
    const todosView = document.createElement('div');
    const addNew = document.createElement('button');
    const footer = document.createElement('footer');
    addNew.id = "addNew";
    projectsMenu.append(projectsH,newProject);
    todosView.appendChild(addNew);
    mainContent.append(projectsMenu,todosView);
    document.getElementById('content').append(banner,mainContent,footer,toDoForm());
    addNew.addEventListener('click',displayForm);
}

