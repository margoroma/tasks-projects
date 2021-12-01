const headerBurger = document.querySelector('.header_burger');
const headerMenu = document.querySelector('.header_menu');
const allBody = document.querySelector('.body');
const burgerLink = document.querySelector('.header_menu');

function onToggle() {
    if (headerBurger) {
            allBody.classList.toggle('_lock');
            headerBurger.classList.toggle('_active');
            headerMenu.classList.toggle('_active');
        };
}