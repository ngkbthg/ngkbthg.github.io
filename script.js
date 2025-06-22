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
const bgBtn = document.getElementById('toggle-bg');
const video = document.getElementById('bg-video');

const videos = [
  "bg/bg.mp4",
  "bg/bg1.mp4",
  "bg/bg2.mp4"
];

let bgIndex = 0;

bgBtn.addEventListener('click', () => {
  bgIndex = (bgIndex + 1) % videos.length;
  video.src = videos[bgIndex];
  video.load();
  video.play().catch(err => {
    console.error("Không thể play video:", err);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video");
  const source = video.querySelector("source");

  const backgrounds = [
    "bg/bg.mp4",
    "bg/bg1.mp4",
    "bg/bg2.mp4"
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedVideo = backgrounds[randomIndex];

  source.src = selectedVideo;
  video.load();
  video.play().catch(err => {
    console.error("Không thể phát video:", err);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("play-music-btn");
  const ytIframe = document.getElementById("yt-playlist");

  const totalVideos = 39; 

  musicBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * totalVideos);
    const playlistId = "PLsnJOHsVvrji_YI-PbuT-eYBQHOaapriV";

    ytIframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&index=${randomIndex}&autoplay=1&loop=1&playlist=${playlistId}`;
    
    musicBtn.innerText = "🎶";
  });
});
