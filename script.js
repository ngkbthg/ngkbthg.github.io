alert("blablablablobloblo");
const btn = document.getElementById('toggle-music');
const audio = document.getElementById('bg-music');
let isPlaying = false;

btn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    btn.textContent = '🎵';
  } else {
    audio.play();
    btn.textContent = '🎶';
  }
  isPlaying = !isPlaying;
});

