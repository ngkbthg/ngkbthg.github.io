
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

  const totalTracks = 95;
  let isPlaying = false;

  function playRandomTrack() {
    const randomIndex = String(Math.floor(Math.random() * totalTracks) + 1).padStart(2, '0');
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

function spawnNeko() {
  const nekoSize = 32;
  const topSafeMargin = Math.abs(document.documentElement.getBoundingClientRect().top);

  const x = Math.random() * (window.innerWidth - nekoSize);
  const y = topSafeMargin + Math.random() * (window.innerHeight - nekoSize - topSafeMargin);

  new Neko(x, y, false); 
}

document.getElementById("add-neko")?.addEventListener("click", spawnNeko);

const audio = document.getElementById("bg-music");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
});

const barCount = 64;
const gap = 2;
const barWidth = (canvas.width - gap * (barCount - 1)) / barCount;

let bars = Array(barCount).fill(0);
let targets = Array(barCount).fill(0);
let animationFrameId = null;

function updateTargets() {
  for (let i = 0; i < barCount; i++) {
    targets[i] = 30 + Math.random() * 70;
  }
}

setInterval(updateTargets, 100);

function drawFakeRealistic() {
  if (audio.paused) {
    cancelAnimationFrame(animationFrameId);
    return;
  }

  animationFrameId = requestAnimationFrame(drawFakeRealistic);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  let x = 0;
  for (let i = 0; i < barCount; i++) {
    bars[i] += (targets[i] - bars[i]) * 0.2;
    const barHeight = bars[i];
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + gap;
  }
}

audio.addEventListener("play", () => {
  canvas.style.opacity = "1";
  if (!animationFrameId) {
    drawFakeRealistic();
  }
});

audio.addEventListener("pause", () => {
  canvas.style.opacity = "0";
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
});


window.addEventListener("click", startVisualizer);
window.addEventListener("keydown", startVisualizer);
