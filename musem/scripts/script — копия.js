/////////////////////// player //////////////////////////////

const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progress = player.querySelector('.input_range');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const mute = player.querySelector('.volume_button');
const fullscreen = player.querySelector('.fullscreen');
const playbotton = document.querySelector('.video_botton_play');

function togglePlay() {
    const action = video.paused ? 'play' : 'pause';
    video[action]();
}

function toggleMute() {
    video.muted = !video.muted;
    mute.classList.toggle('muted');
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

if (!video.paused) {
    playbotton.style.display = none;
    console.log('displ_none');
}

const progress_color = document.querySelector('.progress_color');
video.addEventListener('loadedmetadata', function () {
  progress_color.max = video.duration
});

function moveGradient(value) {
  progress_color.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) ${value}%, rgb(196, 196, 196) ${value}%, rgb(196, 196, 196) 100%)`;
}

progress_color.addEventListener('input', function () {
  const value = this.value;
  video.currentTime = value;
  let percent = 100 / video.duration * value;
  moveGradient(percent);
})

const progress_vol = document.querySelector('.progress_vol');

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
        randArrr.push('<img src=\"./assets/img/gallery/galery' + array[i] + '.jpg\" alt=\"pic\" class=\"gallery-pic\">')
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