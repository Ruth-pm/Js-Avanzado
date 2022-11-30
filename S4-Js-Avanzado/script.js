//10. Crear una funcion que te permita ingresar en un prompt la informacion de un usuario de la siguiente manera:
// "Ingrese la informacion del usuario (nombre, apellido, edad, profesion)"
// El usuario digitara: Andres, Perez, 28, ingeniero.
// La informacion debe ser guardada como objeto dentro del array users asignadole un id unico a cada registro.
//11. Utilizando el objeto Date, añadir la propiedad created_date de manera interna en donde se registre el
// momento en que ese registro fue creado.

    // let usuario = prompt("Ingrese la informacion del usuario: nombre, apellido, edad, profesion: ")
    // let users = { nombre: "", apellido: "", edad: "", profesion: ""}
    // let newUsuario = { id: 0, nombre: "", apellido: "", edad: 0, profesion: "", created_at: ""}
//---------------------------------------------------------------------------------------------------------------------------------
    //FUNCIÓN CREATE (AÑADE UN NUEVO USUARIO)
    function crearUsuario() {   
        let newUsuario = { id: 0, nombre: "", apellido: "", edad: 0, profesion: "", created_at: ""};
            for(const property in newUsuario) {
                if (property === "id"  ) {
                    newUsuario[property] = users[users.length -1].id +1
                }else if (property === "nombre" || property === "apellido" || property === "edad" || property === "profesion"){
                    newUsuario[property] = prompt(`Ingrese su ${[property]} aquí: `)
                }else if (property === "created_at"){
                    newUsuario[property] = new Date().toISOString()
                }else{
                    return;
                }
            }
        users.push(newUsuario)
        tablaUsuarios(users)
    } 
//---------------------------------------------------------------------------------------------------------------------------------

let users = [
    {id: 1, nombre: "Andres", apellido: "Pacheco", edad: 38, profesion: "developer", created_at: "2022-09-26T06:25:21.118Z", modification_at: ""},
    {id: 2, nombre: "Andrea", apellido: "Sanchez", edad: 25, profesion: "profesor", created_at: "2022-04-18T14:14:32.879Z", modification_at: ""},
    {id: 3, nombre: "Julia", apellido: "Ochoa", edad: 32, profesion: "musico", created_at: "2021-12-14T11:53:38.279Z", modification_at: ""},
    {id: 4, nombre: "Samuel", apellido: "Martinez", edad: 29, profesion: "programador", created_at: "2022-01-26T03:31:15.202Z", modification_at: ""},
    {id: 5, nombre: "Roberto", apellido: "Mattos", edad: 40, profesion: "chef", created_at: "2022-07-27T02:06:22.760Z", modification_at: ""},
    {id: 6, nombre: "Mercedes", apellido: "Sanchez", edad: 35, profesion: "veterinario", created_at: "2022-05-01T22:06:35.864Z", modification_at: ""},
]

//12. Crear una funcion que permita ordenar la lista de usuarios por fecha de creacion, de la mas nueva a la mas antigua y viceversa
// utilizando el parametro booleano reverse (si es true se ordenaran de nuevo a antiguo)

function ordenarPorFecha(reverse) {
    if(reverse = true) {
        users.sort((v1, v2) =>{
            const resultado = new Date(v2.created_at) - new Date(v1.created_at)
            return resultado
        })
    }else {
        users.sort((v1, v2) =>{
            const resultado = new Date(v1.created_at) - new Date(v2.created_at)
            return resultado
        })
    }
  tablaUsuarios(users)
}

//13. Crear una funcion que permita filtrar los usuarios por mes y año de creacion.
//  function filtrarFecha() {
//     const filtrar = users.filter((prop) => {
//         const fechaUsuario = new Date(prop.created_at)
//     })
//     tablaUsuarios(users)
//  }

//TABLA DE USUARIOS
const root = document.getElementById("root")
root.classList.add("contenedor")

function tablaUsuarios(){
root.innerHTML = ""

//SECCION TITULO
const h1 = document.createElement("h1")
h1.textContent = "CRUD - Lista de Usuarios"
root.append(h1)
const hr = document.createElement("hr")
root.append(hr)
//boton crear
const btnCrear = document.createElement("button")
btnCrear.textContent = "Añadir Usuario"
btnCrear.style.background = "#159b3e"
btnCrear.style.marginLeft = "7rem"
btnCrear.addEventListener("click",  crearUsuario)
root.append(btnCrear)
//SECCION TABLA
const table = document.createElement('table')
table.classList.add("seccion-table")

// ENCABEZADO DE LA TABLA
const thead = document.createElement("thead")
const tbody = document.createElement("tbody")
const tr = document.createElement('tr')
for(const property in users[0]){
    const th = document.createElement("th")
    th.innerText = property
    th.style.cursor = "pointer"
    tr.append(th)
    th.addEventListener("click", () =>{
        tbody.innerHTML=""
        if (reversa === false) {
            ordenarHeaders(reversa, th.textContent)
            reversa = true
        }else{
            ordenarHeaders(reversa, th.textContent)
            reversa = false
        }
        tablaUsuarios(users)
    })
}
thead.append(tr)
table.append(thead)

// CUERPO DE LA TABLA
tbody.innerHTML = users.map((e) => {
    return `<tr><td>${e.id}</td><td>${e.nombre}</td><td>${e.apellido}</td><td>${e.edad}</td><td>${e.profesion}</td><td>${e.created_at}</td><td>${e.modification_at}</td>
    </tr>`}).join("")
table.append(tbody)
root.append(table)

//SECCION BOTONES    
const div = document.createElement("div")
div.classList.add("contenedor-button")
root.append(div)

const btnLeer = document.createElement("button")
btnLeer.textContent = "Ver Registro"
btnLeer.style.background = "#0075FF"
btnLeer.addEventListener("click", verRegistro)
div.append(btnLeer)
    
const btnActualizar = document.createElement("button")
btnActualizar.textContent = "Actualizar"
btnActualizar.style.background = "#ef8c00"
btnActualizar.addEventListener("click", actualizarRegistro)
div.append(btnActualizar)

const btnEliminar = document.createElement("button")
btnEliminar.textContent = "Eliminar"
btnEliminar.style.background = "#df222f"
btnEliminar.addEventListener("click",() => eliminarRegistro)
div.append(btnEliminar)

}
tablaUsuarios()

// READ
// El admin debe poder visualizar en pantalla los registros que estan siendo creados.

function verRegistro() {
    tablaUsuarios(users)
}
// UPDATE
// El admin, al presionar un boton: "Modificar registro" en la parte inferior de la lista de registros, debe
// ver un prompt que le pida que ingrese el id del registro que desea modificar, en caso no ingrese ninguno,
// debe volver a la pagina inicial. Si elige modificar alguno, debe aparecer nuevamente el prompt del ejercicio 10
// OJO: Cuando el admin modifique el registro, no se debe modificar la fecha de creacion, en su lugar debe aparecer
// un nuevo campo de fecha de modificacion.

//FUNCIÓN UPDATE (ACTUALIZAR REGISTRO)
function actualizarRegistro() {
    const id = +prompt("Ingrese el id que desea modificar")
    const usuario = users.find((usuario) => usuario.id === id)
    console.log(usuario)
    
    if (usuario) {
        for(const property in usuario) {
            if (property === "id" || property === "created_at" ) {
                continue;
            } else if (property === "nombre" || property === "apellido" || property === "edad" || property === "profesion"){
                usuario[property] = prompt(`Ingrese su ${[property]} aquí: `)
            } else if (property === "modification_at"){
                usuario[property] = new Date()
            }else{
               return;
            }
        }
    }else {
        alert("Error: Actualizacion Cancelada")
    }
    tablaUsuarios(users)
}
 
// DELETE
// El admin, al presionar un boton: "Borrar registro" en la parte inferior de la lista de registros, debe ver
// un prompt que le pida ingresar el id del registro que desea borrar. Al dar click, debe aparecer un prompt
// que le pregunte: "Esta usted seguro? Si/No" y al escribir Si, deberia borrarlo. En cualquier otro caso
// deberia volver a la pagina inicial sin que se haya borrado ningun registro.

//FUNCIÓN DELETE (ELIMINAR REGISTRO)
function eliminarRegistro() {
    if (users.length > 0) {
        const idEliminar = +prompt("Ingrese el id del usuario que desea eliminar")
        for(index in users){
            if (users[index].id == idEliminar) {
                const rpta = prompt(`El id ${idEliminar} si existe. ¿Está usted seguro?, SI/NO`)
                if(rpta.toLowerCase() === "si"){
                    users.splice(index, 1);
                    alert("Usuario eliminado")
                } else if (rpta.toLowerCase() === "no"){
                    alert("No se elimino ningun usuario de la tabla")
                }else{
                    return eliminarRegistro()
                }
            }
        }
    } else {
        alert("Error:Ingrese un id válido")
    }
    tablaUsuarios(users)
}
 
// OPCIONAL1: Añadir a la tabla la funcionalidad de ordenar los registros al hacer click en los encabezados
// (como en el caso de Pokemon). Sin embargo, al momento de hacer click nuevamente en el encabezado, los datos
// deben ordenarse de manera inversa. Ejemplo: Si al hacer click se ordenan de menor a mayor, al volver a hacer
// click deben ordenarse de mayor a menor.
function ordenarHeaders(prop) {
    const th = document.querySelectorAll("th")
        th.addEventListener("click",() =>{
            ordenarPorFecha(prop)
            tablaUsuarios(users)
        })
}

// OPCIONAL2: Crear un selector que permita filtrar los datos por fecha.
