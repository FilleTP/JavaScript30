// make filled bar take up space of progress bar as video plays
// translate controls from original player to our own?
// Make bar clickable to go to certain time point
// click event to fill bar to specific point
// click event on play button, change to playing icon and vice versa



// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll(".player__slider");



// Build our functions

const togglePlay = () => {
  if(video.paused){
    video.play();
  }
  else {
    video.pause();
  }
}

const updateButton = () => {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

const skip = (e) => {
  video.currentTime += parseFloat(e.target.dataset.skip);
}

const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;

}

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up the event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
