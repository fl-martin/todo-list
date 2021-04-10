(()=>{"use strict";const e=[],t=[];let n=0;const d=d=>{t.push((t=>{const d=n;return n++,{getID:()=>d,getName:()=>t,changeName:e=>t=e,projectToDos:()=>e.filter((e=>e.getProjectID()==d))}})(d))},o=e=>{document.getElementById(e).style.display="flex"},c=e=>{document.getElementById(e).style.display="none"},a=()=>{document.getElementById("name").value="",document.getElementById("date").value="",document.getElementById("description").value="",document.getElementById("priority").value="",document.getElementById("projectID").value=""},l=t=>{const n=document.createElement("div"),d=document.createElement("div"),o=document.createElement("div"),c=document.createElement("div"),a=document.createElement("div"),l=document.createElement("div"),u=document.createElement("div"),s=document.createElement("button"),p=document.createElement("button"),E=document.createElement("button");return n.dataset.todoid=e.indexOf(t),d.textContent=t.getName(),o.textContent=t.getDate(),c.textContent=t.getDescription(),a.textContent=t.getPriority(),l.textContent=t.getProjectID(),u.textContent=t.getCheckState(),c.style.display="none",E.style.display="none",n.append(d,o,c,a,l,u,s,p,E),n.classList.add("defaultDisplay"),s.addEventListener("click",(e=>{m(e.target.parentNode),r(e.target.parentNode)})),p.addEventListener("click",(()=>{var d;d=e.indexOf(t),e[d]="",i(n)})),n},i=e=>{console.log(e),e.parentNode.removeChild(e)},m=e=>{e.classList.toggle("defaultDisplay"),e.classList.toggle("detailDisplay")},r=e=>{e.classList.contains("defaultDisplay")?(e.childNodes[2].style.display="none",e.childNodes[8].style.display="none"):(e.childNodes[2].style.display="block",e.childNodes[8].style.display="block")},u=()=>{const e=t.filter((e=>{const t=e.getID();document.querySelector(`div[data-projectid = "${t}]`)}));console.log(e),t.forEach((e=>{const t=document.createElement("div"),n=document.createElement("div"),d=document.createElement("input");t.dataset.projectid=e.getID(),d.type="checkbox",n.textContent=e.getName(),d.classList.add("displayCheckbox"),d.addEventListener("change",s.bind(void 0,e,d)),t.append(n,d),document.getElementById("projectsList").appendChild(t)}))},s=(e,t)=>{const n=e.projectToDos();n.forEach((e=>{var d;""!==e&&(1==t.checked?(d=e,document.getElementById("todosView").appendChild(l(d))):0==t.checked&&i(document.querySelectorAll("div[data-todoid]")[n.indexOf(e)]))}))};(()=>{const n=document.createElement("header"),l=document.createElement("main"),i=document.createElement("nav"),m=document.createElement("h1"),r=document.createElement("button"),p=document.createElement("div"),E=document.createElement("div"),y=document.createElement("button"),g=document.createElement("footer");i.id="projectsMenu",p.id="projectsList",r.id="newProject",E.id="todosView",y.id="addNew",i.append(m,p,r),E.appendChild(y),l.append(i,E),document.getElementById("content").append(n,l,g,(()=>{const n=document.createElement("form"),d=document.createElement("input"),o=document.createElement("input"),l=document.createElement("input"),i=document.createElement("div"),m=document.createElement("input"),r=document.createElement("label"),u=document.createElement("input"),p=document.createElement("label"),E=document.createElement("input"),y=document.createElement("label"),g=document.createElement("select"),v=document.createElement("button"),h=document.createElement("button");return m.type="radio",u.type="radio",E.type="radio",m.name="priority",u.name="priority",E.name="priority",m.value="low",u.value="low",E.value="high",r.htmlFor="low",r.textContent="Low",p.htmlFor="mid",p.textContent="Mid",y.htmlFor="high",y.textContent="High",i.append(m,r,u,p,E,y),n.append(d,o,l,i,g,v,h),n.id="form",d.id="name",o.id="date",l.id="description",i.id="priority",m.id="lowPriority",u.id="midPriority",E.id="highPriority",g.id="projectID",v.id="addToDo",h.id="closeForm",v.type="button",h.type="button",v.addEventListener("click",(()=>{(()=>{const t=document.getElementById("name").value,n=document.getElementById("date").value,d=document.getElementById("description").value,o=document.getElementById("form").elements.priority.value,c=document.getElementById("projectID").options[document.getElementById("projectID").selectedIndex].dataset.projectID;e.push(((e,t,n,d,o,c)=>{let a=!1;return{getName:()=>e,changeName:t=>e=t,getDate:()=>t,changeDate:e=>t=e,getDescription:()=>n,changeDescription:t=>e=t,getPriority:()=>d,getProjectID:()=>o,changeProjectID:e=>o=e,changePriority:e=>d=e,getCheckState:()=>a,check:()=>a=!a}})(t,n,d,o,c))})(),(()=>{const e=document.getElementById("projectID").options[document.getElementById("projectID").selectedIndex].dataset.projectID,n=document.querySelector(`div[data-projectid = "${e}"]`).childNodes[1],d=t[e];0==n.checked&&(n.checked=!0),s(d,n)})(),c("form"),a()})),h.addEventListener("click",(()=>{c("form"),a()})),n})(),(()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("input"),o=document.createElement("button"),a=document.createElement("button");return e.append(t,n,o,a),e.id="projectForm",o.addEventListener("click",(()=>{d(n.value),u(),c("projectForm"),n.value=""})),a.addEventListener("click",c.bind(void 0,"projectForm")),e})()),r.addEventListener("click",o.bind(void 0,"projectForm")),y.addEventListener("click",(()=>{(()=>{document.getElementById("projectID").options.length=t.length;for(let e=0;e<t.length;e++)document.getElementById("projectID").options[e].textContent=t[e].getName(),document.getElementById("projectID").options[e].dataset.projectID=t[e].getID()})(),o("form")}))})(),d("myList"),u()})();