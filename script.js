// Terminal logic
const terminal = document.getElementById("terminal");
const form = document.getElementById("terminal-form");
const input = document.getElementById("terminal-input");

const THEMES = {
  mono: "theme-mono",
  light: "theme-light",
  hack: "theme-hack"
};

let history = [
  "Welcome to my website, unemployed!! Type 'help'"
];

function render() {
  terminal.innerHTML = history.map(line =>
    line.startsWith("> ")
      ? `<span style="color:#888">${line}</span>`
      : line
  ).join("<br/>");
  terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(cmd) {
  const trimmed = cmd.trim();
  if (trimmed === "help") {
    return `All command:
- help: show this message
- about: about this website
- about-me: about me
- fetch: your informations, yes, YOUR!!
- set-theme: change theme (mono, light, hack)
- matrix: hiển thị mấy cái kí tự ngầu như hacker để sĩ gái (ấn ESC để thoát)
- clear: delete all trash you've made
- exit: you cannot exit with this command`;
  }
  if (trimmed === "exit") {
    return `Alt + F4 bro 💔💔🥀🥀`;
  }
  if (trimmed === "fetch") {
    var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.ipify.org?format=json", false); // false = đồng bộ
  xhr.send(null);
    var ip = JSON.parse(xhr.responseText).ip;
    return JSON.stringify({
      ip: ip,
      ua: navigator.userAgent,
      lang: navigator.language,
      ram: navigator.deviceMemory + " GB",
      cpu: navigator.hardwareConcurrency + " threads",
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      window: `${innerWidth}x${innerHeight}`
  }, null, 2).slice(1,-1);
}
  if (trimmed === "about") {
    return `Xin chào mấy con người thất nghiệp đã đến với website của tôi, web này không dùng cho mục đích gì ngoài để cho tôi đem đi sĩ và tốn thời gian của các người, hết rồi `;
  }
  if (trimmed === "about-me") {
    return `Xin chào tôi là ngkbthg, tôi là người tạo ra web này, các bạn có thể nhắn tôi ở discord "ducyeungotband" và subcribe cho kênh @ngkbthg (chả đăng cái mẹ gì).`;
  }
  if (trimmed.startsWith("set-theme")) {
    const t = trimmed.split(/\s+/)[1];
    if (t && THEMES[t]) {
      document.body.className = THEMES[t];
      return `Đã đổi theme sang ${t}`;
    } else {
      return "Web hiện tại chỉ có các theme như mono, light, hack thôi";
    }
  }
  if (trimmed === "matrix") {
    startMatrix();
    return null;
  }
  if (trimmed === "clear") {
    history = [];
    render();
    return null;
  }
  return `Không có lệnh ${cmd}, nhập 'help' để xem danh sách lệnh khả thi`;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const cmd = input.value;
  if (!cmd.trim()) return;
  history.push("> " + cmd);
  const result = handleCommand(cmd);
  if (result != null) {
    history.push(result);
  }
  render();
  input.value = "";
});

window.addEventListener("click", () => input.focus());

function startMatrix() {
  matrixMode = true;
  terminal.innerHTML = '';
  form.style.display = 'none';

  // Canvas setup
  let canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = 9999;
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  let ctx = canvas.getContext('2d');

  function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);

  // Matrix logic
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  letters = letters.split('');
  let fontSize = 18;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];
  for (let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height / fontSize;

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = fontSize + "px 'Roboto Mono', monospace";
    ctx.fillStyle = '#0F0';
    for (let i = 0; i < columns; i++) {
      let text = letters[Math.floor(Math.random()*letters.length)];
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if (drops[i]*fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }
  matrixInterval = setInterval(draw, 50);

  // ESC to exit
  function stopMatrix(e) {
    if (e.key === "Escape") {
      matrixMode = false;
      clearInterval(matrixInterval);
      window.removeEventListener('resize', resizeMatrix);
      window.removeEventListener('keydown', stopMatrix);
      canvas.remove();
      form.style.display = '';
      render();
      input.focus();
    }
  }
  window.addEventListener('keydown', stopMatrix);
}

// init
document.body.className = THEMES.mono;
render();
