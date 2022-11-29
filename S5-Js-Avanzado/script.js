const form = document.querySelector('#form')
form.addEventListener("submit", calcular)

function calcular(e) {
    e.preventDefault();
    const name = document.querySelector('#name').value
    const lastname = document.querySelector('#lastname').value
    const catg = document.querySelector('#categoria').value
    const tiempoS = document.querySelector('#tiempServ').value
    const hora = document.querySelector('#hora').value
    let sueldoInicial = 0
    let tiempoServicio = 0

    //Categorias
    if (catg == "A") {
        sueldoInicial = hora * 40
    } else if (catg == "B"){
        sueldoInicial = hora * 35
    } else {
        sueldoInicial = hora * 30
    }
    
    //Bonificacion
    if (tiempoS == "1-3") {
        tiempoServicio = sueldoInicial * 0.15
    } else if (tiempoS == "4-7"){
        tiempoServicio = sueldoInicial * 0.20
    } else if (tiempoS == "8-12"){
        tiempoServicio = sueldoInicial * 0.30
    } else {
        tiempoServicio = sueldoInicial * 0.35
    }
    
    //Sueldo final
    let sueldoFinal = sueldoInicial + tiempoServicio

    const respuesta=document.getElementById('respuesta')
    respuesta.textContent=`${name} ${lastname} de Categoría ${catg} y con ${tiempoS} años de servicio laborable recibirá: ` 
    const sueldoneto=document.getElementById('sueldoneto')
    sueldoneto.textContent=` Sueldo Básico: S/. ${sueldoInicial} - Bonificación por años de Servicio: S/. ${tiempoServicio} - Sueldo Neto: S/. ${sueldoFinal}` 
}
