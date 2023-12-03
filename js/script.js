let alerta = document.getElementById("alerta");
let num_suc = document.getElementById("n-suc");
let dir_suc = document.getElementById("dir-suc");
let buscar = document.querySelector(`#buscar`);
let btns = document.getElementById('btns');
let hide = document.getElementById('hide');
let clase = document.querySelectorAll('.display');
let clase2 = document.querySelectorAll('.display2');
let saludo = document.getElementById('saludo');
let legajostg = sessionStorage.getItem('legajo');
let contrastg = sessionStorage.getItem('contraseña');
let form = document.getElementById('formulario');
let ocultar = document.querySelectorAll('.ocultar');
let cerarsesion = document.getElementById('cerrar');
let leguser = document.getElementById('ingresarlegajo');
let passuser = document.getElementById('ingresarcontraseña');
let VoF = false;
let inv = document.getElementById('invitado');
let b = document.getElementById('b');
// Entra en modo invitado que tiene menos funcionalidades----------------
inv.addEventListener('click', () => {
    for (let indexx = 0; indexx < ocultar.length; indexx++) {
        ocultar[indexx].classList.remove('display');
        form[indexx].classList.add('display');   
        inv.classList.add('display');                     
    }
})
// Boton para cerra sesion y borrar el session storage---------------------------
cerarsesion.addEventListener('click', cerrar);
function cerrar() {
    sessionStorage.clear('legajo');
    sessionStorage.clear('contraseña');
    for (let ind = 0; ind < ocultar.length; ind++) {
        ocultar[ind].classList.add('display')  
        form[ind].classList.remove('display') 
        inv.classList.remove('display')
        btns.classList.add('display');
        hide.classList.add('display');
        alerta.innerHTML = "";
        saludo.innerHTML = "";  
        leguser.value = "";
        passuser.value = "";       
    }
};
// Boton para iniciar sesion. Guarda en el session storage el nº de legajo y contraseña ingresada por el usuario------
form.addEventListener("submit", (e) => {
    location.reload( );
    e.preventDefault();
    sessionStorage.setItem('legajo', leguser.value);
    sessionStorage.setItem('contraseña', passuser.value);
    legajostg = form.children[1].value;
    verificaruser();
    console.log(legajostg + " " + contrastg);
})
// Busca en el array de usuarios registrados si los datos ingresados existen para luego mostrar la app------------
let verificaruser = () => {  
    fetch("js/users.json")
    .then(resultadous => resultadous.json())
    .then(respuestaus =>{ 
        for( let f=0; f < respuestaus.length; f++){
        let leg = respuestaus[f].legajo;   
        let pass = respuestaus[f].contra;  
        let nom = respuestaus[f].nomb; 
        if(legajostg == leg && contrastg == pass){
            saludo.innerHTML = `${nom}`;
            for (let indexx = 0; indexx < ocultar.length; indexx++) {
                ocultar[indexx].classList.remove('display');
                form[indexx].classList.add('display'); 
                inv.classList.add('display');              
            }             
            break;
        }else{
            for (let index1 = 0; index1 < ocultar.length; index1++) {
                ocultar[index1].classList.add('display')     
            }
        }
    } })
    .catch(error =>
        window.location.href = "404.html"
    )    
}
// Funcion de verificar si los datos existen en el array para realizar o no el inicio de sesion----------
verificaruser();
// Realiza busqueda de la sucursal ingresada e imprimir la direccion----
buscar.addEventListener(`click`, agregarSuc);
function agregarSuc(){
    let input = document.querySelector(`#ingresar_num`).value;
    input == 69420 ? alert("Tecni-Coto 2022. Idea: Miranda Emiliano. Desarrollo: Padin Gabriel") : VoF = true;
    // Realiza la peticion get hacia el archivo json que contiene las sucursales por medio de fetch-----------------
    fetch("js/sucus.json")
    .then(resultado => resultado.json())
    .then(respuesta =>{
        // Busca en el array la sucursal obtenida de la respuesta y la imprime
        for( let i=0; i < respuesta.length; i++){
            let numerosSuc = respuesta[i].numeroSuc;    
            if(numerosSuc == input){
                for (let index = 0; index < clase.length; index++) {
                    clase[index].classList.remove('display')     
                }
                num_suc.innerHTML = input;
                dir_suc.innerHTML = respuesta[i].dir;
                VoF = false;
                alerta.innerHTML = "";
            break;
            }
        }
    })
        // Devuelve el mensaje que la sucu no existe si el numero ingresado no esta en el array
        if (VoF) {
            for (let index = 0; index < clase2.length; index++) {
                clase2[index].classList.remove('display2')     
            }
            btns.classList.add('display');
            hide.classList.add('display');
            alerta.innerHTML = "La sucursal no existe"
    }
}
// Copar al portapapeles------------------
function CopyToClipboard(){
var r = document.createRange();
r.selectNode(document.getElementById("dir-suc"));
window.getSelection().removeAllRanges();
window.getSelection().addRange(r);
document.execCommand('copy');
window.getSelection().removeAllRanges();
Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Direccion copiada',
    showConfirmButton: false,
    timer: 1000
})
}
// Realizar busqueda al apretar enter-----------
let input = document.getElementById("ingresar_num");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("buscar").click();
    }
});
// Fecha y hora -----------------------
function startTime(){
    today=new Date();
    h=today.getHours();
    m=today.getMinutes();
    s=today.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('reloj').innerHTML=h+":"+m+":"+s;
    t=setTimeout('startTime()',500);}
    function checkTime(i)
    {if (i<10) {i="0" + i;}return i;}
    window.onload=function(){startTime();
}
    let date = new Date();
    let d  = date.getDate();
    let day = (d < 10) ? '0' + d : d;
    let m = date.getMonth() + 1;
    let month = (m < 10) ? '0' + m : m;
    let yy = date.getYear();
    let year = (yy < 1000) ? yy + 1900 : yy;
    document.getElementById('fecha').innerHTML = day + "-" + month + "-" + year;
