let chooseType = document.querySelectorAll('.choose_ticket input');
let chooseTypeBooking = document.querySelector('.type_choose');
const totalPrice = document.querySelector('.ticket_total span');

const basicInput_1 = document.querySelector('.basic_person input');
const basicRemove_1 = document.querySelector('.remove_basic');
const basicAdd_1 = document.querySelector('.add_basic');
const basicInput_2 = document.querySelector('.basic_booking input');
const basicRemove_2 = document.querySelector('.basic_booking button:nth-child(1)');
const basicAdd_2 = document.querySelector('.basic_booking button:nth-child(3)');

const seniorInput_1 = document.querySelector('.senior_person input');
const seniorRemove_1 = document.querySelector('.remove_senior');
const seniorAdd_1 = document.querySelector('.add_senior');
const seniorInput_2 = document.querySelector('.senior_booking input');
const seniorRemove_2 = document.querySelector('.senior_booking button:nth-child(1)');
const seniorAdd_2 = document.querySelector('.senior_booking button:nth-child(3)');

let startPrice = 20;
let basicPrice = basicInput_1.value;
let seniorPrice = seniorInput_1.value;
const bookingForm = document.forms.formular;
const basicTotal = document.querySelector('.basic_total');
console.log(bookingForm);

// for (i of chooseType) {
//     if (i.value === localStorage.chooseType) {
//         i.checked = true;
//     } else {
//         i.checked = false;
//     }
// }

chooseType.forEach((radio) => {
    radio.addEventListener('change', () => {
        startPrice = radio.value;
        changeTotal();
    })
})

basicRemove_1.addEventListener('click', () => {
    basicPrice = basicInput_1.value;
    changeTotal();
})

basicAdd_1.addEventListener('click', () => {
    basicPrice = basicInput_1.value;
    changeTotal();
})

seniorRemove_1.addEventListener('click', () => {
    seniorPrice = seniorInput_1.value;
    changeTotal();
})

seniorAdd_1.addEventListener('click', () => {
    seniorPrice = seniorInput_1.value;
    changeTotal();
})

function changeTotal() {
    totalPrice.textContent = startPrice * basicPrice + startPrice / 2 * seniorPrice;

    basicInput_2.value = basicPrice;
    basicInput_1.value = basicPrice;
    seniorInput_2.value = seniorPrice;
    seniorInput_1.value = seniorPrice;

    document.querySelector('.basic_all_tickets').innerHTML = `<span class="basic_all_tickets">${basicPrice}</span>`;
    document.querySelector('.basic_precio').innerHTML = `<span class="basic_precio">${basicInput_1.value * startPrice}</span>`;
    document.querySelector('.senior_all_tickets').innerHTML = `<span class="senior_all_tickets">${seniorPrice}</span>`;
    document.querySelector('.senior_precio').innerHTML = `<span class="senior_precio">${seniorInput_1.value * startPrice / 2}</span>`;
    document.querySelector('.precio_total').innerHTML = ` <span class="precio_total">${startPrice * basicPrice + startPrice / 2 * seniorPrice}</span>`;
    document.querySelector('.zero_precio_basic').innerHTML = `<span class="zero_precio_basic">${startPrice}</span>`;
    document.querySelector('.zero_precio_senior').innerHTML = `<span class="zero_precio_basic">${startPrice / 2}</span>`;

    chooseTypeBooking.value = startPrice;
    document.getElementById(`${startPrice}`).checked = true;

    typeOnTicket = chooseTypeBooking.label;

    document.querySelector('.choose_ticket_book').innerHTML = `<span class="choose_ticket_book">${typeOnTicket}</span>`;
}

const buyTickets = document.querySelector('.tickets_buy');

buyTickets.addEventListener('click', () => {
    changeTotal();
})

chooseTypeBooking.addEventListener('change', () => {
    startPrice = chooseTypeBooking.value;
    changeTotal();
})

basicRemove_2.addEventListener('click', () => {
    basicPrice = basicInput_2.value;
    changeTotal();
})

basicAdd_2.addEventListener('click', () => {
    basicPrice = basicInput_2.value;
    changeTotal();
})

seniorRemove_2.addEventListener('click', () => {
    seniorPrice = seniorInput_2.value;
    changeTotal();
})

seniorAdd_2.addEventListener('click', () => {
    seniorPrice = seniorInput_2.value;
    changeTotal();
})





const dataTicketBook = document.querySelector('.data_ticket_book');
const date_form = bookingForm.querySelector("input[type='date']");


function dateToText(dates) {
    let result = dates.toLocaleDateString('en-US', { month: 'long', day: '2-digit', weekday: 'long', }).split(' ');
    return `${result[0]} ${result[1]} ${result[2]}`;
}
function currentDateNow() {
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();
    let dateNow = year + '-' + month + '-' + day;
    dataTicketBook.textContent = dateToText(currentDate)
    date_form.setAttribute('min', dateNow);
}

currentDateNow();

