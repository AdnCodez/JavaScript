// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const controls = player.querySelector('.controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');
// Build our functions


function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}
function updateButton() {
  const icon = this.paused ? '▶' : '▮▮';
  toggle.textContent = icon;  
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function goFullScreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
      video.msRequestFullscreen();
    }
}
function spacePlay(e) {
  var x = e.keyCode;
  if (x === 32){
    togglePlay();
  }  
}
function fForFull(e) {
  var x = e.keyCode;
  if (x === 70){
    goFullScreen();
  }  
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('mousedown', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', () => {
//   if (mousedown) {
//     scrub();
//   }
// });
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


fullScreen.addEventListener('click', goFullScreen);
document.addEventListener('keyup', spacePlay);
document.addEventListener('keyup', fForFull);




