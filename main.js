let data = {
  x : 0
};

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

(function () {
  if (localStorage.text_area) document.getElementById("mainTextArea").value = localStorage.getItem("text_area");
})();

window.addEventListener("beforeunload", (e) => localStorage.setItem('text_area', document.getElementById("mainTextArea").value), false);
