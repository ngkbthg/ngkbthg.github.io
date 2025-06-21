alert("blablablablobloblo");
const btn = document.getElementById('toggle-music');
const audio = document.getElementById('bg-music');
let isPlaying = false;

btn.addEventListener('click', async () => {
  try {
    if (isPlaying) {
      audio.pause();
      btn.textContent = '🔈';
    } else {
      await audio.play(); // thêm await cho chắc cú
      btn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
  } catch (e) {
    console.error("Không thể phát nhạc:", e);
  }
});
