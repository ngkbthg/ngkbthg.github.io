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
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  const icon = btn.querySelector(".material-icons");

  const totalTracks = 40;
  let isPlaying = false;

  function playRandomTrack() {
    const randomIndex = Math.floor(Math.random() * totalTracks) + 1;
    audio.src = `music/${randomIndex}.mp3`;
    audio.play();
  }

  btn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      icon.innerText = "music_off"; 
    } else {
      playRandomTrack();
      icon.innerText = "music_note"; 
    }

    isPlaying = !isPlaying;
  });

  audio.addEventListener("ended", () => {
    if (isPlaying) {
      playRandomTrack(); 
    }
  });
});

function typeLine(element, text, speed, callback) {
  let i = 0;
  function typing() {
    if (i <= text.length) {
      element.textContent = text.slice(0, i);
      i++;
      setTimeout(typing, speed);
    } else {
      callback && callback();
    }
  }
  typing();
}

function typeAllLines() {
  const lines = document.querySelectorAll('.typewriter');
  let index = 0;

  function nextLine() {
    if (index < lines.length) {
      const el = lines[index];
      const txt = el.getAttribute('data-text');
      typeLine(el, txt, 5, () => {
        index++;
        nextLine();
      });
    }
  }

  nextLine();
}

window.addEventListener("load", () => {
  const wrapper = document.querySelector(".center-wrapper");
  wrapper.classList.remove("hidden");
  wrapper.classList.add("visible");
  document.body.classList.add("visible");

  typeAllLines();
});

window.addEventListener("load", () => {
  const bgVideo = document.getElementById("bg-video");
  const darkmodeBtn = document.getElementById("darkmode");
  const icon = document.getElementById("bg-icon");

  // Mặc định là bật
  const bgEnabled = localStorage.getItem("bgEnabled");

  if (bgEnabled === "false") {
    bgVideo.style.display = "none";
    icon.textContent = "dark_mode";
  } else {
    bgVideo.style.display = "block";
    icon.textContent = "light_mode";
  }

  darkmodeBtn.addEventListener("click", () => {
    const isVisible = bgVideo.style.display === "block";
    if (isVisible) {
      bgVideo.style.display = "none";
      icon.textContent = "dark_mode";
      localStorage.setItem("bgEnabled", "false");
    } else {
      bgVideo.style.display = "block";
      icon.textContent = "light_mode";
      localStorage.setItem("bgEnabled", "true");
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-neko").addEventListener("click", () => {
    const x = Math.random() * window.innerWidth * 0.8;
    const y = Math.random() * window.innerHeight * 0.8;
    new Neko(x, y, true);
  });
});
