function onPageLoaded() {
	const input = document.querySelector(".todo__input");
	const ul = document.querySelector("ul.todo__list");

	function createTodo() {
		const li = document.createElement("li");
		li.classList.add("todo__list-item");
		const textSpan = document.createElement("span");
		textSpan.classList.add("todo__list-item-text");
		const newTodo = input.value;
		textSpan.append(newTodo);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("todo__list-item-trash");
		const icon = document.createElement("i");
		icon.classList.add("todo__list-item-trash-icon", "fas", "fa-trash-alt");
		deleteBtn.appendChild(icon);

		ul.appendChild(li).append(textSpan, deleteBtn);
		input.value = "";
		listenDeleteTodo(deleteBtn);
	}
	function listenDeleteTodo(element) {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		});
	}
	input.addEventListener("keypress", (keyPressed) => {
		const keyEnter = 13;
		if (keyPressed.which == keyEnter) {
			createTodo();
		}
	});
	ul.addEventListener("click", onClickTodo);
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
console.log('huuuu');