const formular = document.getElementById('formular');
const inputs = document.querySelectorAll('#formular input');

const expressions = {
	email: /^[A-za-z0-9\-\_]{3,15}@\w+([\.-]?[a-zA-Z]{3,})(\.[a-zA-Z]{2,})+$/,
    name: /^[a-zA-Zа-яА-Я \s]{3,15}$/,
	phone: /^[ -]*([0-9][ -]*){1,10}$/ 
}

const fields = {
	name: false,
	email: false,
	phone: false
}

const validFormular = (e) => {
	switch (e.target.name) {
		case "name":
			validField(expressions.name, e.target, 'name');
		break;
		case "email":
			validField(expressions.email, e.target, 'email');
		break;
		case "phone":
			validField(expressions.phone, e.target, 'phone');
		break;
	}
}

const validField = (expression, input, field) => {
	if(expression.test(input.value)){
		document.getElementById(`group_${field}`).classList.remove('formular_group-incorrect');
		document.getElementById(`group_${field}`).classList.add('formular_group-correct');
		document.querySelector(`#group_${field} .formular_input-error`).classList.remove('formular_input-error-active');
		fields[field] = true;
	} else {
		document.getElementById(`group_${field}`).classList.add('formular_group-incorrect');
		document.getElementById(`group_${field}`).classList.remove('formular_group-correct');
		document.querySelector(`#group_${field} .formular_input-error`).classList.add('formular_input-error-active');
		fields[field] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validFormular);
	input.addEventListener('blur', validFormular);
});

