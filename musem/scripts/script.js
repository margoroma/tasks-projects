/////////////////////// player //////////////////////////////

const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progress = player.querySelector('.input_range');
const toggle = player.querySelector('.toggle');
const mute = player.querySelector('.volume_button');
const fullscreen = player.querySelector('.fullscreen');
const playBotton = document.querySelector('.video_botton_play');
const bottonIcon = document.querySelector('.play-button-icon');
const volumeIcon = document.querySelector('.volume-button-icon');
const videoAll = document.querySelector('.video_container');

function togglePlay() {
    const action = video.paused ? 'play' : 'pause';
    video[action]();
    if (!video.paused) {
      playBotton.style.display = 'none';
      bottonIcon.src = "./assets/svg/pause.svg";
    }
    if (video.paused) {
      playBotton.style.display = 'inline';
      bottonIcon.src = "./assets/svg/play_bt.svg";
    }
}

function toggleMute() {
  // console.log('muuuuute');
    video.muted = !video.muted;
    if (!video.muted) {
      volumeIcon.src = "./assets/svg/volume_button.svg";
    }
    if (video.muted) {
      volumeIcon.src = "./assets/svg/mute.svg";
    }
}

function toggleFull() {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}

document.addEventListener('fullscreenchange', toggleFullScreenClasses);
let isFullScreen = false;
function toggleFullScreenClasses() {
    player.classList.toggle('fullscreen');
    videoAll.classList.toggle('fullscreen');
    isFullScreen = !isFullScreen;
}

video.addEventListener('timeupdate', function () {
  let value = video.currentTime * 100 / video.duration;
  progress_color.value = value;
  if (value === 100) {
    playBotton.style.display = 'inline';
  }
})

const progress_color = document.querySelector('.progress_color');

function moveGradient(value) {
  progress_color.style.background = `linear-gradient(to right, rgb(256, 256, 256) 0%, rgb(256, 256, 256) ${value}%, rgb(0, 0, 0) ${value}%, rgb(0, 0, 0) 100%)`;
}

progress_color.addEventListener('input', function () {
  const value = this.value;
  video.currentTime = video.duration / 100 * value;
  moveGradient(value);
})

const progress_vol = document.querySelector('.progress_vol');

progress_vol.addEventListener('input', function () {
  const value = this.value;
  video.volume = value;
  if (value === '0') {
    video.muted = true;
    volumeIcon.src = "./assets/svg/mute.svg";
  } else {
    video.muted = false;
    volumeIcon.src = "./assets/svg/volume_button.svg";
  }
});

let observer = new IntersectionObserver(function (entries, obs) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      document.addEventListener('keypress', vidCtrl);
    } else {
      document.removeEventListener('keypress', vidCtrl);
    }
  });
});

observer.observe(player);


function vidCtrl(e) {    
  const vid = document.querySelector('video');
  const key = e.code;
    if (key === 'Space') {
      e.preventDefault();
      togglePlay();
    }
    else if (key === 'KeyF') {
      toggleFull();
    }
    else if (key === 'KeyM') {
      toggleMute();
    }
    else if (key === 'Period') {
      vid.playbackRate += 0.1;      
    } 
    else if (key === 'Comma'){
      vid.playbackRate -= 0.1;
    } 
    else if (key === 'KeyP') {
        vid.volume += 0.05;     
    } else if (key === 'KeyO'){
        vid.volume -= 0.05;
    }

    if ( key === 'KeyJ') {
      vid.currentTime -= 10;
      if (vid.currentTime < 0) {
      vid.pause();
      vid.currentTime = 0;
      }
    } 
    else if (key === 'KeyL') {
      vid.currentTime += 10;
      if (vid.currentTime > vid.duration) {
      vid.pause();
      vid.currentTime = 0;
      }
    } 
    else if (key === 'KeyK' ) {
      if (vid.paused || vid.ended) {
      vid.play();
      } else {
      vid.pause();}
    }   

    else if (key === 'Digit0') {
      vid.currentTime = 0;
    }  
    else if (key === 'Digit1') {
      vid.currentTime = vid.duration * 0.1;
    }    
    else if (key === 'Digit2') {
      vid.currentTime = vid.duration * 0.2;
    }
    else if (key === 'Digit3') {
      vid.currentTime = vid.duration * 0.3;
    }
    else if (key === 'Digit4') {
      vid.currentTime = vid.duration * 0.4;
    }
    else if (key === 'Digit5') {
      vid.currentTime = vid.duration * 0.5;
    }
    else if (key === 'Digit6') {
      vid.currentTime = vid.duration * 0.6;
    }
    else if (key === 'Digit7') {
      vid.currentTime = vid.duration * 0.7;
    }
    else if (key === 'Digit8') {
      vid.currentTime = vid.duration * 0.8;
    }
    else if (key === 'Digit9') {
      vid.currentTime = vid.duration * 0.9;
    }
  // console.log(key);
}




////////////////////////gallery //////////////////////////

const pictureInnerContainer = document.querySelector('.picture-inner-container');
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function shuffle(array) {
    let randArrr = [];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    for (i = 0; i < array.length; i ++) {
        randArrr.push('<img src=\"./assets/img/gallery/galery' + array[i] + '.jpg\" alt=\"pic\" class=\"gallery-pic fade-in-bottom\">')
    }
    return randArrr;
}

shuffle(arr).forEach((elem) => pictureInnerContainer.innerHTML += elem)




//////////////////////// booking /////////////////////////

const callBookForm = document.querySelector('.tickets_buy');
const bookForm = document.querySelector('.booking_container');
const closeBook = document.querySelector('booking_close');
const booking = document.querySelector('.booking_container')

function bookingActive() {
    if (booking.classList.contains("booking_active")) {
      booking.classList.remove("booking_active")
    }
    else {
      booking.classList.add("booking_active")
        }
}

document.querySelector(".booking_container").addEventListener("click", function (e) {
    e = window.event || e;
    if(this === e.target) {
        if (booking.classList.contains("booking_active")) {
          booking.classList.remove("booking_active")
        }
        else {
          booking.classList.add("booking_active")
            }
    }
})

///////////////////////////// ripple //////////////////////

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const box = button.getBoundingClientRect();

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - box.left - radius}px`;
  circle.style.top = `${event.clientY - box.top - radius}px`;
  circle.classList.add("ripple");
  console.log(button.clientWidth, button.clientHeight);
  

  button.appendChild(circle);
  setTimeout(() => circle.remove(), 500)

}

const buttons = document.getElementsByClassName("buy_rip");
console.log(buttons);
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}


/////////////////////// burger /////////////////////////////

const headerBurger = document.querySelector('.header_burger');
const headerMenu = document.querySelector('.header_menu');
const welcomeLeft = document.querySelector('.visiting_left');
const burgerLink = document.querySelector('.header_link');
const burgerButtom = document.querySelector('.burger_bottom_');

function onToggle() {
  if (headerBurger) {
    headerBurger.classList.toggle('_active');
    burgerLink.classList.toggle('_active');
    headerMenu.classList.toggle('_active');
    burgerButtom.classList.toggle('_active');
    welcomeLeft.classList.toggle('_deactive');
  };
}


/////////////////////// swiper welcome /////////////////////////

const fraction = document.getElementById("fraction");
const slides = document.querySelectorAll(".swiper-slide.welk");
const slideCount = slides.length;
fraction.textContent = `01 | 0${slideCount}`;

new Swiper(".welcomeSwiper", {
  slidesPerView: 1,
  spaceBetween: 42,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      fraction.textContent = `0${this.realIndex + 1} | 0${slideCount}`;
    }
  }  
});



/////////////////////// swiper video /////////////////////////
const videosYT = document.querySelectorAll('.swiper-slide.yt');
const videosCount = videosYT.length;

new Swiper(".videoSwiper", {
  slidesPerView: 3,
  spaceBetween: 42,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      video.src = `./assets/video/video${this.realIndex}.mp4`;
      video.poster = `./assets/video/poster${this.realIndex}.jpg`;
    }
  }
});



//////////////////////// explore slider////////////////////

const slider = document.querySelector(".slider_expl input");
const img = document.querySelector(".images .img-2");
const dragLine = document.querySelector(".slider_expl .drag-line");
slider.oninput = ()=>{
  let sliderVal = slider.value;
  dragLine.style.left = sliderVal + "%";
  img.style.width = sliderVal + "%";
}



///////////////////////// maps ///////////////////////////////

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ29yb21hIiwiYSI6ImNrdW40bmRsaDBxNXkzMHRoNGgyamc0OWQifQ.OCBBT606YzUq2PMYxev38A';
let map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/margoroma/ckum7zmapecku17prwz6qu9iq', 
    center: [2.3363, 48.86090], 
    zoom: 15.5 
   });

map.addControl(new mapboxgl.NavigationControl());
const marker1 = new mapboxgl.Marker({ "color": "black" })
    .setLngLat([2.3364, 48.86091])
    .addTo(map);
const marker2 = new mapboxgl.Marker({ "color": "grey" })
    .setLngLat([2.3333, 48.8602])
    .addTo(map);
const marker3 = new mapboxgl.Marker({ "color": "grey" })
    .setLngLat([2.3397, 48.8607])
    .addTo(map);
const marker4 = new mapboxgl.Marker({ "color": "grey" })
    .setLngLat([2.3330, 48.8619])
    .addTo(map);
const marker5 = new mapboxgl.Marker({ "color": "grey" })
    .setLngLat([2.3365, 48.8625])
    .addTo(map);
