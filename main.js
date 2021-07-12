let data = {
  x : 0,

  light() {
    document.documentElement.style.setProperty("--text-area-bg-color", "white");
    document.documentElement.style.setProperty("--text-area-text-color", "black");

    document.documentElement.style.setProperty("--body-color", "white");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(255, 255, 255, 0.60)");
    document.documentElement.style.setProperty("--black-color", "black");
  }, 

  dark() {
    document.documentElement.style.setProperty("--text-area-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-text-color", "white");

    document.documentElement.style.setProperty("--body-color", "black");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(20, 20, 20, 0.60)");
    document.documentElement.style.setProperty("--black-color", "white");
  }
};

(function () {
  if (localStorage.text_area) document.getElementById("mainTextArea").value = localStorage.getItem("text_area");
  themeRadioItems();
})(); 

function followSystemTheme() {
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  if (dark) data.dark();
  if (light) data.light();
}

function themeRadioItems() {
  if (localStorage.getItem("theme-radio") == 1) {
    document.getElementById("theme-radio-1").checked = true;
    followSystemTheme();
  } else if (localStorage.getItem("theme-radio") == 2) {
    document.getElementById("theme-radio-2").checked = true;
    data.light();
  } else if (localStorage.getItem("theme-radio") == 3) {
    document.getElementById("theme-radio-3").checked = true;
    data.dark();
  } else return;
}

document.querySelectorAll("#themes-input-blc > input[name='theme-radios']").forEach((item) => {
  item.addEventListener("click", () => {
    item.checked = true;
    
    if (item.value == "system") followSystemTheme();
    else if (item.value == "light") data.light();
    else if (item.value == "dark") data.dark();
    else return;
  });
});

function autoSizeTxtArea() {
  const tx = document.getElementById("mainTextArea");
  tx.setAttribute("style", "height:" + (tx.scrollHeight) + "px;overflow-y:hidden;");
  tx.addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}
autoSizeTxtArea();

window.addEventListener("beforeunload", (e) => {
  localStorage.setItem('text_area', document.getElementById("mainTextArea").value), false;

  if (document.getElementById("theme-radio-1").checked == true) localStorage.setItem("theme-radio", 1);
  else if (document.getElementById("theme-radio-2").checked == true) localStorage.setItem("theme-radio", 2);
  else if (document.getElementById("theme-radio-3").checked == true) localStorage.setItem("theme-radio", 3);
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

