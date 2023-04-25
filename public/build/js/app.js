let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const n=document.querySelector(".actual");n&&n.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:n,precio:o}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=n;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$"+o;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServicio(e)},r.appendChild(a),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function seleccionarServicio(e){const{id:t}=e,{servicios:n}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);n.some(e=>e.id===t)?(cita.servicios=n.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...n,e],o.classList.add("seleccionado"))}function idCliente(){cita.id=document.querySelector("#id").value}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no abrimos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Hora no valida","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,n,o=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(n).appendChild(c),o&&setTimeout(()=>{c.remove()},5e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Faltan servicios, fecha u hora","error",".contenido-resumen",!1);const{nombre:t,fecha:n,hora:o,servicios:a}=cita,c=document.createElement("H3");c.textContent="Resumen de servicios",e.appendChild(c),a.forEach(t=>{const{id:n,precio:o,nombre:a}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=a;const i=document.createElement("P");i.innerHTML="<span>Precio: </span> $"+o,c.appendChild(r),c.appendChild(i),e.appendChild(c)});const r=document.createElement("H3");r.textContent="Resumen de cita",e.appendChild(r);const i=document.createElement("P");i.innerHTML="<span>Nombre: </span> "+t;const s=new Date(n),d=s.getMonth(),l=s.getDate()+2,u=s.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML="<span>Fecha: </span> "+m;const v=document.createElement("P");v.innerHTML=`<span>Hora: </span> ${o} horas`;const h=document.createElement("P");h.innerHTML="<span>Cantidad de servicios: </span> "+a.length;const f=a.reduce((e,t)=>e+parseFloat(t.precio),0),C=document.createElement("P");C.innerHTML="<span>Precio final: </span> $"+f;const L=document.createElement("BUTTON");L.classList.add("boton"),L.textContent="Reservar cita",L.onclick=reservarCita,e.appendChild(i),e.appendChild(p),e.appendChild(v),e.appendChild(h),e.appendChild(C),e.appendChild(L)}async function reservarCita(){const{nombre:e,fecha:t,hora:n,servicios:o,id:a}=cita,c=o.map(e=>e.id),r=new FormData;r.append("fecha",t),r.append("hora",n),r.append("usuarioId",a),r.append("servicios",c);const i=await fetch("http://localhost:3000/api/citas",{method:"POST",body:r});await i.json()}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));