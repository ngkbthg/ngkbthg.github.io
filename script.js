alert("hello bn");
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('toggle-music');
  const audio = document.getElementById('bg-music');
  let isPlaying = false;

  btn.addEventListener('click', async () => {
    try {
      if (isPlaying) {
        audio.pause();
        btn.textContent = '🎵';
      } else {
        await audio.play();
        btn.textContent = '🎶';
      }
      isPlaying = !isPlaying;
    } catch (e) {
      console.error("Không thể phát nhạc:", e);
    }
  });
});
function updateClock() {
  const now = new Date();
  const date = now.toLocaleDateString("vi-VN", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = now.toLocaleTimeString("vi-VN", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById("date").textContent = date;
  document.getElementById("clock").textContent = time;
}

setInterval(updateClock, 1000);
updateClock(); 
