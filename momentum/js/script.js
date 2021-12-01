import playList from './playList.js';

const time = document.querySelector('.time');
const currDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const bottQuote = document.querySelector('.change-quote');
const author = document.querySelector('.author');
const bottPlay = document.querySelector('.play');
const bottPrev = document.querySelector('.play-prev');
const bottNext = document.querySelector('.play-next');
const playerPlay = document.querySelector('.play-pause');
const playerStop = document.querySelector('.stops');
const playerBack = document.querySelector('.back');
const playerForward = document.querySelector('.forward');
const playerMute = document.querySelector('.mute');
const playerProgress = document.getElementById('seek');
const playerVolume = document.getElementById('volume');
const backSong = document.querySelector('.back-song');
const forwardSong = document.querySelector('.forward-song');
const textSong = document.querySelector('.text');
const pictures = document.querySelector('.pictures');

////////////////////// time & date ////////////////////////////////

const date = new Date();

function showDate(date) {
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: "Europe/Minsk"};
    const currentDate = date.toLocaleDateString('en-En', options);
    currDate.textContent = currentDate;
}

function showTime() {
    const date = new Date();
    const options = {hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Minsk'};
    const currentTime = date.toLocaleString('es-Es', options);
    time.textContent = currentTime;
    showDate(date);
    showGreeting();
    setTimeout(showTime, 1000);    
}
showTime();


/////////////////////////////// greeting ///////////////////////////////////////

let partDay = showGreeting();

function showGreeting() {
    const hours = date.getHours();
    let partDay;

    if (hours < 6) {
        partDay = 'night';
        greeting.textContent = 'Good night';
        return partDay;
    }
    else if (hours < 12) {
        partDay = 'morning';
        greeting.textContent = 'Good morning';
        return partDay;
    }
    else if (hours < 18) {
        partDay = 'afternoon';
        greeting.textContent = 'Good afternoon';
        return partDay;
    }
    else if (hours > 17) {
        partDay = 'evening';
        greeting.textContent = 'Good evening';
        return partDay;
    }
}

////////////////////// local storage /////////////////////

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

/////////////////////////////// bg ///////////////////////////////////

let numRand = getRandomNum(1, 20);

function setBg() {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${String(numRand).padStart(2, "0")}.jpg')`;
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setBg();

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

function getSlideNext() {
    let numNext = Number(numRand);

    if (numNext === 20) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/01.jpg')`;
        numRand = 1;
    }
    else {numNext += 1;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${String(numNext).padStart(2, "0")}.jpg')`;
    numRand = numNext;
    }
}

function getSlidePrev() {
    let numPrev = Number(numRand);

    if (numPrev === 1) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/20.jpg')`;
        numRand = 20;
    }
    else {numPrev -= 1;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${String(numPrev).padStart(2, "0")}.jpg')`;
    numRand = numPrev;
    }
}

//////////////////////////// weather ////////////////////////////////

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7a5f2b9de7644e870a4c48af78d704a2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
}
getWeather();


function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

/////////////////////////////// quotes //////////////////////////////

bottQuote.addEventListener('click', getQuotes);

function getQuotes() {
    const quotes = './js/data.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => {
        const quoteRand = getRandomNum(0, data.length - 1);
        quote.textContent = data[quoteRand].text;
        author.textContent = data[quoteRand].author;
    });
}
getQuotes();

/////////////////////////////// audio ///////////////////////////////

bottPlay.addEventListener('click', playAudio);
// bottPlay.style.display = none;

const audio = new Audio();
let isPlay = false;

function playAudio() {
    audio.src = playList[playNum].src;
    textSong.textContent = playList[playNum].title;
    audio.currentTime = 0;

    if (isPlay === false) {
        audio.play();
        isPlay = true;
    }
    else if (isPlay) {
        isPlay = false;
        audio.pause();
    }

    else if (audio.play()) {
        isPlay = false;
        audio.pause();
    }
    // else {
    //     isPlay = false;
    //     audio.pause();
    // }
}

audio.onend = function(){
    audio.src = playNext;
}


///////////////////////////////// playlist ///////////////////////


const soundList = document.querySelector('.play-list');

for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.id = `item${i}`;
    li.textContent = playList[i].title;
    document.body.appendChild(li);
    document.addEventListener('click',function(e){
        if(e.target && e.target.id== `item${i}`){
            li.classList.add('item-active');
            audio.src = playList[i].src;
            audio.currentTime = 0;
            audio.play();
        }
        else {
            li.classList.remove('item-active');
        }
    });
    soundList.append(li);
}


let playNum = 0;
bottNext.addEventListener('click', playNext);
bottPrev.addEventListener('click', playPrev);
forwardSong.addEventListener('click', playNext);
backSong.addEventListener('click', playPrev);

function playNext() {
    if (playNum === playList.length - 1) {
        playNum = 0;
    }
    else {
        playNum += 1;
    }
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    textSong.textContent = playList[playNum].title;
    playerProgress.value = 0;
    moveGradient(0);
    audio.play();
}

function playPrev() {
    if (playNum === 0) {
        playNum = playList.length - 1;
    }
    else {
        playNum -= 1;
    }
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    textSong.textContent = playList[playNum].title;
    playerProgress.value = 0;
    moveGradient(0);
    audio.play();
}


///////////////////////// player //////////////////////


function skipBack() {
	audio.currentTime = (audio.currentTime - 5);
}

function skipFwd() {
    audio.currentTime = (audio.currentTime + 5);
}

function stop() {
	audio.pause();
	audio.currentTime = 0;
	playerProgress.value = 0;
    moveGradient(0);
}

function mute() {
    audio.muted = !audio.muted;
	if (audio.muted) {
		playerMute.innerHTML = '<i class="fa fa-volume-off"></i>';
	} 
    if (!audio.muted) {
		playerMute.innerHTML = '<i class="fa fa-volume-up"></i>';
	}
}


function setData() {
    audio.addEventListener('timeupdate', timeUpdateList)
}

function timeUpdateList() {
    playerProgress.value = audio.currentTime / (audio.duration / 100);
    moveGradient(playerProgress.value);
}

function moveGradient(value) {
    playerProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

playerProgress.addEventListener('input', function () {
    audio.currentTime = playerProgress.value * audio.duration / 100;
    let percent = playerProgress.value;
    moveGradient(percent);
})

audio.addEventListener('loadedmetadata', setData);


playerVolume.oninput = function(){
  if (this.value == this.min){
    audio.volume = 0;
  } else if(this.value == this.max){
    audio.volume = 1;
  } else {
    audio.volume = this.value;
  }
}

playerProgress.oninput = function(){
    if (this.value == this.min){
      audio.currentTime = 0;
    } else if(this.value == audio.duration){
      audio.currentTime = audio.duration;
    } else {
      audio.currentTime = this.value;
    }
  }



playerPlay.addEventListener('click', playAudio);
playerBack.addEventListener('click', skipBack);
playerForward.addEventListener('click', skipFwd);
playerStop.addEventListener('click', stop);
playerMute.addEventListener('click', mute);

///////////////////////// image //////////////////////

let somePic = getLinkToImageUnsplash();

async function getLinkToImageUnsplash() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=QUXbTLLQbeMAySmLNxyHBRK_AG9W_rG7nsls9loi2QU';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular);
    pictures.innerHTML = `<a href="${data.urls.regular}" target="_blank"><img src="${data.urls.regular}" alt="pic"></a>`;
    
}

getLinkToImageUnsplash();

async function getLinkToImageFlickr() {
    const urlf = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=516833e6eaace748b86812d5d0066a4f&per_page=20&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const resf = await fetch(urlf);
    const dataf = await resf.json();
    console.log(dataf.photos.photo[numRand].url_l);
}

getLinkToImageFlickr();


///////////////////////// todo ////////////////////////


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
        localStorage.setItem("todos", ul.innerHTML);
		input.value = "";
		listenDeleteTodo(deleteBtn);
	}
	function listenDeleteTodo(element) {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
            localStorage.removeItem('todos', ul.innerHTML);
			event.stopPropagation();
		});
	}
    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
    }
	input.addEventListener("keypress", (keyPressed) => {
		const keyEnter = 13;
		if (keyPressed.which == keyEnter) {
			createTodo();
            localStorage.setItem("todos", ul.innerHTML);
		}
	});
    // createTodo();
    listenDeleteTodo();
    loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);


/////////////////////////// setting menu //////////////////////////////

const playerStand = document.querySelector('.player');
const playerGlow = document.querySelector('.glow');
const labelLang = document.querySelector('.languages-label');
const labelImg = document.querySelector('.imgs-label');
const textEn = document.querySelector('.en');
const textBe = document.querySelector('.be');
const textRu = document.querySelector('.ru');
const languageSelector = document.getElementById('languages');
const imgsSellector = document.getElementById('imgs');
const menuSettings = document.querySelector('.sett_menu');
const closeSettings = document.querySelector('.close');
const settings = document.querySelector('.settings');
const settingsPlayer = document.getElementById('players');
const settingsWeather = document.getElementById('weathers');
const settingsTime = document.getElementById('times');
const settingsDate = document.getElementById('dates');
const settingsGreeting = document.getElementById('greetings');
const settingsTodoList = document.getElementById('todo-l');
const settingsPict = document.getElementById('pict');
const settingsQuotes = document.getElementById('quotes');
const tagInput = document.querySelector('.label-txt');
const txtPlaceholder = document.getElementById('tag');
const greetingContainer = document.querySelector('.greeting-container');
const quotesContainer = document.querySelector('.quotes-container');
const listTodo = document.querySelector('.list-todo');
const titleTodo = document.querySelector('.todo__title');
const inputTodo = document.querySelector('.todo__input');


// tagInput.textContent = tagsLabel[lang];
// txtPlaceholder.placeholder = tagsPlaceholder[lang];

const tagsLabel = ['Tags', 'Тэгi', 'Теги']; 
const tagsPlaceholder = ['Nature, Animals, Cars...', 'Прырода, Жывёлы, Аўта', 'Природа, Животные, Авто...']

settingsPlayer.checked = +localStorage.playerVisible;
settingsWeather.checked = +localStorage.weatherVisible;
settingsTime.checked = +localStorage.timeVisible;
settingsDate.checked = +localStorage.dateVisible;
settingsGreeting.checked = +localStorage.greetingVisible;
settingsQuotes.checked = +localStorage.quotesVisible;
settingsTodoList.checked = +localStorage.todoVisible;
settingsPict.checked = +localStorage.pictVisible;


let cityList = ['Minsk', 'Мiнск', 'Минск'];
let lang = sessionStorage.lang || 0;
let imageSource = sessionStorage.img || '0';
// let city = sessionStorage.city || cityList[lang];
const namePlaceholder = ['[Enter name]', '[Увядзіце імя]', '[Введите имя]'];
const langText = [['English', 'Belarusian', 'Russian'], ['Англiйская', 'Беларуская', 'Руская'], ['Английский', 'Белоруский', 'Русский']];
const selectLangLabel = ['Select language', 'Выберыце мову', 'Выберите язык'];
const selectImgLabel = ['Select source', 'Выберыце крынiцу', 'Выберите источник'];
const settingsPlayerText = ['Player','Плэер','Плеер'];
const settingsTimeText = ['Time','Гадзіннiк','Часы'];
const settingsDateText = ['Date','Дата','Дата'];
const settingsQuotesText = ['Quotes','Цытата дня','Цитата дня'];
const settingsPictText = ['Wallpapers',"Шпалеры",'Обои'];
const settingsTodoText = ['ToDo-list',"Спіс спраў",'Cписок дел'];
const todoPlaceholder = ['Add...',"Дадаць...",'Добавить...'];
const settingsWeatherText = ['Weather',"Надвор'е",'Погода'];
const settingsGreetingText = ['Greeting','Прывітанне','Приветствие'];

function setLang() {
    // if (cityList.includes(city)) {
    //     city.placeholder = cityList[lang];
    //     city.value = city;
    // }
    // city.textContent = cityList[lang];
    settingsPlayer.labels[0].textContent = settingsPlayerText[lang];
    settingsTime.labels[0].textContent = settingsTimeText[lang];
    settingsDate.labels[0].textContent = settingsDateText[lang];
    settingsQuotes.labels[0].textContent = settingsQuotesText[lang];
    settingsWeather.labels[0].textContent = settingsWeatherText[lang];
    settingsTodoList.labels[0].textContent = settingsTodoText[lang];
    settingsPict.labels[0].textContent = settingsPictText[lang];
    settingsGreeting.labels[0].textContent = settingsGreetingText[lang];
    labelLang.textContent = selectLangLabel[lang];
    labelImg.textContent = selectImgLabel[lang];
    textEn.textContent = langText[lang][0];
    textBe.textContent = langText[lang][2];
    textRu.textContent = langText[lang][1];
    nameInput.placeholder = namePlaceholder[lang];
    inputTodo.placeholder = todoPlaceholder[lang];
    titleTodo.textContent = settingsTodoText[lang];
    tagInput.textContent = tagsLabel[lang];
    txtPlaceholder.placeholder = tagsPlaceholder[lang];
    // showTime();
    // showDate();
    // getWeather();
    // changeQuote();
}

setLang();

function selectLanguage() {
    lang = +languageSelector.value;
    sessionStorage.lang = +lang;
    setLang()
}

function selectSrc() {
    imageSource = imgsSellector.value;
    sessionStorage.img = imageSource;
    changeImage()
}

function openMenu() {
    menuSettings.classList.add('sett_menu-active');
}

function closeMenu() {
    menuSettings.classList.remove('sett_menu-active');
}

function hideElementPlayer() {
    if (settingsPlayer.checked) {
        playerStand.classList.remove('no-visible');
        playerGlow.classList.remove('no-visible');
    } else {
        playerStand.classList.add('no-visible');
        playerGlow.classList.add('no-visible');
        audio.pause();
    }
    localStorage.playerVisible = +settingsPlayer.checked;
}

hideElementPlayer();

function hideElementWeather() {
    if (settingsWeather.checked) {
        weather.classList.remove('no-visible');
    } else {
        weather.classList.add('no-visible');
    }
    localStorage.weatherVisible = +settingsWeather.checked;
}

hideElementWeather();

function hideElementTime() {
    if (settingsTime.checked) {
        time.classList.remove('no-visible');
    } else {
        time.classList.add('no-visible');
    }
    localStorage.timeVisible = +settingsTime.checked;
}

hideElementTime();

function hideElementDate() {
    if (settingsDate.checked) {
        currDate.classList.remove('no-visible');
    } else {
        currDate.classList.add('no-visible');
    }
    localStorage.dateVisible = +settingsDate.checked;
}

hideElementDate();

function hideElementQuotes() {
    if (settingsQuotes.checked) {
        quotesContainer.classList.remove('no-visible');
    } else {
        quotesContainer.classList.add('no-visible');
    }
    localStorage.quotesVisible = +settingsQuotes.checked;
}

hideElementQuotes();


function hideElementGreeting() {
    if (settingsGreeting.checked) {
        greetingContainer.classList.remove('no-visible');
    } else {
        greetingContainer.classList.add('no-visible');
    }
    localStorage.greetingVisible = +settingsGreeting.checked;
}

hideElementGreeting();

function hideElementTodo() {
    if (settingsTodoList.checked) {
        listTodo.classList.remove('no-visible');
    } else {
        listTodo.classList.add('no-visible');
    }
    localStorage.todoVisible = +settingsGreeting.checked;
}

hideElementTodo();

function hideElementPictures() {
    if (settingsPict.checked) {
        pictures.classList.remove('no-visible');
    } else {
        pictures.classList.add('no-visible');
    }
    localStorage.pictVisible = +settingsGreeting.checked;
}

hideElementPictures();

settings.addEventListener('click', openMenu);
closeSettings.addEventListener('click', closeMenu);

languageSelector.value = lang;
imgsSellector.value = imageSource;

languageSelector.addEventListener('change', selectLanguage);
imgsSellector.addEventListener('change', selectSrc);
settingsPlayer.addEventListener('change', hideElementPlayer);
settingsWeather.addEventListener('change', hideElementWeather);
settingsTime.addEventListener('change', hideElementTime);
settingsDate.addEventListener('change', hideElementDate);
settingsQuotes.addEventListener('change', hideElementQuotes);
settingsGreeting.addEventListener('change', hideElementGreeting);
settingsTodoList.addEventListener('change', hideElementTodo);
settingsPict.addEventListener('change', hideElementPictures);
