let data = {
  x : 0,

  light() {
    document.documentElement.style.setProperty("--text-area-bg-color", "white");
    document.documentElement.style.setProperty("--text-area-text-color", "black");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "white");

    document.documentElement.style.setProperty("--body-color", "white");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(255, 255, 255, 0.60)");
    document.documentElement.style.setProperty("--black-color", "black");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "white");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(0, 0, 0, 0.6)");
  }, 

  dark() {
    document.documentElement.style.setProperty("--text-area-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-text-color", "white");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "white");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "black");

    document.documentElement.style.setProperty("--body-color", "black");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(20, 20, 20, 0.60)");
    document.documentElement.style.setProperty("--black-color", "white");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "white");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(255, 255, 255, 0.1)");
  },

  matrix() {
    document.documentElement.style.setProperty("--text-area-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-text-color", "#00FF00");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "#00FF00");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "black");

    document.documentElement.style.setProperty("--body-color", "black");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(250, 250, 250, 0)");
    document.documentElement.style.setProperty("--black-color", "#00FF00");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "#00FF00");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(0, 255, 0, 0.3)");
  }
};

// ALL EVENTS
window.onload = function() {
  if (localStorage.text_area) document.getElementById("mainTextArea").value = localStorage.getItem("text_area");
  themeRadioItems();
  soundRadioItems();
  randomTxtPlaceHolder();
  autoSizeTxtArea();
} 
window.addEventListener("keydown", function(e) {
  if (localStorage.getItem("sound-radio") == 1) btnSound();
  else if (localStorage.getItem("sound-radio") == 2) return;  
});
document.querySelectorAll("#themes-input-blc > input[name='theme-radios']").forEach((item) => {
  item.addEventListener("click", () => {
    item.checked = true;
    
    if (item.value == "system") followSystemTheme();
    else if (item.value == "light") data.light();
    else if (item.value == "dark") data.dark();
    else if (item.value == "matrix") data.matrix();
    else return;
  });
});
document.querySelectorAll("#sound-radio-blc > input[name='sound-radios']").forEach((item) => {
  item.addEventListener("click", () => {
    item.checked = true;
    
    if (item.value == "yes") localStorage.setItem("sound-radio", "1");
    else if (item.value == "no") localStorage.setItem("sound-radio", "2");
    else return;
  });
});
window.addEventListener("beforeunload", (e) => {
  localStorage.setItem('text_area', document.getElementById("mainTextArea").value), false;

  if (document.getElementById("theme-radio-1").checked == true) localStorage.setItem("theme-radio", "1");
  else if (document.getElementById("theme-radio-2").checked == true) localStorage.setItem("theme-radio", "2");
  else if (document.getElementById("theme-radio-3").checked == true) localStorage.setItem("theme-radio", "3");
  else if (document.getElementById("theme-radio-4").checked == true) localStorage.setItem("theme-radio", "4");

  if (document.getElementById("sound-radio-1").checked == true) localStorage.setItem("sound-radio", "1");
  else if (document.getElementById("sound-radio-2").checked == true) localStorage.setItem("sound-radio", "2");
});
document.getElementById("header-menu-btn").addEventListener("click", (e) => {
  let stt_blc = document.getElementById("main-settings-block");
  if (stt_blc.style.display = "none") {
    stt_blc.style.display = "flex";
    document.getElementById("header-menu-btn").style.display = "none";
  }
});
document.getElementById("settings-menu-btn").addEventListener("click", (e) => {
  let stt_blc = document.getElementById("main-settings-block");
  if (stt_blc.style.display = "flex") {
    stt_blc.style.display = "none";
    document.getElementById("header-menu-btn").style.display = "block";
  }
});
document.getElementById("delete-all-text-btn").addEventListener("click", (e) => document.getElementById("mainTextArea").value = "");
document.getElementById("copy-all-text-btn").addEventListener("click", (e) => navigator.clipboard.writeText(document.getElementById("mainTextArea").value).then(() => console.log('Successful!'), (err) => console.error('not copy: ', err)));

function btnSound() {
  let audio = new Audio();
  audio.preload = 'auto';
  audio.src = 'resours/sounds/one_tap.mp3';
  audio.play();
}
function soundRadioItems() {
  if (localStorage.getItem("sound-radio") == "1") document.getElementById("sound-radio-1").checked = true;
  else if (localStorage.getItem("sound-radio") == "2") document.getElementById("sound-radio-2").checked = true;
}

function followSystemTheme() {
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  if (dark) data.dark();
  else if (light) data.light();
  else data.light();
}
function themeRadioItems() {
  if (localStorage.getItem("theme-radio") == "1") {
    document.getElementById("theme-radio-1").checked = true;
    followSystemTheme();
  } else if (localStorage.getItem("theme-radio") == "2") {
    document.getElementById("theme-radio-2").checked = true;
    data.light();
  } else if (localStorage.getItem("theme-radio") == "3") {
    document.getElementById("theme-radio-3").checked = true;
    data.dark();
  } else if (localStorage.getItem("theme-radio") == "4") {
    document.getElementById("theme-radio-4").checked = true;
    data.matrix();
  } else return;
}

function autoSizeTxtArea() {
  const tx = document.getElementById("mainTextArea");
  tx.setAttribute("style", "height:" + (tx.scrollHeight) + "px;overflow-y:hidden;");
  tx.addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function randomTxtPlaceHolder() {
  let arr = ['Unleash your imagination...', 'Start writing...' , 'Do you want to write ?', 'I advise you to write without mistakes :)', 'Write, write non-stop :)']
  document.getElementById("mainTextArea").placeholder = arr[Math.floor(Math.random() * arr.length)];
}
