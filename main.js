(()=>{"use strict";const e=[];document.getElementById("content").appendChild((()=>{const t=document.createElement("form"),n=document.createElement("input"),c=document.createElement("input"),d=document.createElement("input"),o=document.createElement("input"),m=document.createElement("input"),a=document.createElement("button");return t.append(n,c,d,o,m,a),n.id="name",c.id="date",d.id="description",o.id="priority",m.id="projectID",a.id="add",a.type="button",a.addEventListener("click",(()=>{(()=>{const t=document.getElementById("name").value,n=document.getElementById("date").value,c=document.getElementById("description").value,d=document.getElementById("priority").value,o=document.getElementById("projectID").value,m=e.length-1;e.push(((e,t,n,c,d,o)=>{let m=!1;return{getName:()=>e,changeName:t=>e=t,getDate:()=>t,changeDate:e=>t=e,getDescription:()=>n,changeDescription:t=>e=t,getPriority:()=>c,getProjectID:()=>d,changeProjectID:e=>d=e,changePriority:e=>c=e,getCheckState:()=>m,check:()=>m=!m,getIndex:()=>o}})(t,n,c,d,o,m))})(),t.style.display="none",document.getElementById("name").value="",document.getElementById("date").value="",document.getElementById("description").value="",document.getElementById("priority").value="",document.getElementById("projectID").value="",console.log(e[0].getName())})),t.id="form",t})())})();