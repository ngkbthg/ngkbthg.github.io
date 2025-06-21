alert("blablablablobloblo");
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('toggle-music');
  const audio = document.getElementById('bg-music');
  let isPlaying = false;

  btn.addEventListener('click', async () => {
    try {
      if (isPlaying) {
        audio.pause();
        btn.textContent = '🔈';
      } else {
        await audio.play();
        btn.textContent = '🔊';
      }
      isPlaying = !isPlaying;
    } catch (e) {
      console.error("Không thể phát nhạc:", e);
    }
  });
});
