
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	contraseña: /^.{4,10}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	celular: /^9\d{8}$/ 
}

const property = {
	usuario: false,
	nombre: false,
	contraseña: false,
	correo: false,
	celular: false
}

const validarForm = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "contraseña":
			validarCampo(expresiones.contraseña, e.target, 'contraseña');
			validarContraseña2();
		break;
		case "contraseña2":
			validarContraseña2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "celular":
			validarCampo(expresiones.celular, e.target, 'celular');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`seccion-${campo}`).classList.remove('form-seccion-incorrecto');
		document.getElementById(`seccion-${campo}`).classList.add('form-seccion-correcto');
		document.querySelector(`#seccion-${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#seccion-${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#seccion-${campo} .form-input-error`).classList.remove('form-input-error-activo');
		property[campo] = true;
	} else {
		document.getElementById(`seccion-${campo}`).classList.add('form-seccion-incorrecto');
		document.getElementById(`seccion-${campo}`).classList.remove('form-seccion-correcto');
		document.querySelector(`#seccion-${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#seccion-${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#seccion-${campo} .form-input-error`).classList.add('form-input-error-activo');
		property[campo] = false;
	}
}

const validarContraseña2 = () => {
	const inputContraseña1 = document.getElementById('contraseña');
	const inputContraseña2 = document.getElementById('contraseña2');

	if(inputContraseña1.value !== inputContraseña2.value){
		document.getElementById(`seccion-contraseña2`).classList.add('form-seccion-incorrecto');
		document.getElementById(`seccion-contraseña2`).classList.remove('form-seccion-correcto');
		document.querySelector(`#seccion-contraseña2 i`).classList.add('fa-times-circle');
		document.querySelector(`#seccion-contraseña2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#seccion-contraseña2 .form-input-error`).classList.add('form-input-error-activo');
		property['contraseña'] = false;
	} else {
		document.getElementById(`seccion-contraseña2`).classList.remove('form-seccion-incorrecto');
		document.getElementById(`seccion-contraseña2`).classList.add('form-seccion-correcto');
		document.querySelector(`#seccion-contraseña2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#seccion-contraseña2 i`).classList.add('fa-check-circle');
		document.querySelector(`#seccion-contraseña2 .form-input-error`).classList.remove('form-input-error-activo');
		property['contraseña'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarForm);
	input.addEventListener('blur', validarForm);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if(property.usuario && property.nombre && property.contraseña && property.correo && property.celular ){
		form.reset();

		document.getElementById('form-mensaje-exito').classList.add('form-mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('form-mensaje-exito').classList.remove('form-mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form-seccion-correcto').forEach((icono) => {
			icono.classList.remove('form-seccion-correcto');
		});
	} else {
		document.getElementById('form-mensaje').classList.add('form-mensaje-activo');
        setTimeout(() => {
			document.getElementById('form-mensaje').classList.remove('form-mensaje-activo');
		}, 4000);
        
	}
})