let db;

let data = {
  x : 0,
  base : [],

  light() {
    document.documentElement.style.setProperty("--text-area-bg-color", "white");
    document.documentElement.style.setProperty("--text-area-text-color", "black");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "white");

    document.documentElement.style.setProperty("--body-color", "white");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(255, 255, 255, 0.50)");
    document.documentElement.style.setProperty("--black-color", "black");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "white");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--create-text-input-bg-color", "white");
    document.documentElement.style.setProperty("--create-text-input-text-color", "black");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(0, 0, 0, 0.6)");
  }, 

  dark() {
    document.documentElement.style.setProperty("--text-area-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-text-color", "white");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "white");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "black");

    document.documentElement.style.setProperty("--body-color", "black");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(20, 20, 20, 0.50)");
    document.documentElement.style.setProperty("--black-color", "white");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "white");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--create-text-input-bg-color", "black");
    document.documentElement.style.setProperty("--create-text-input-text-color", "white");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(255, 255, 255, 0.1)");
  },

  matrix() {
    document.documentElement.style.setProperty("--text-area-bg-color", "black");
    document.documentElement.style.setProperty("--text-area-text-color", "#00FF00");
    document.documentElement.style.setProperty("--text-area-selection-bg-color", "#00FF00");
    document.documentElement.style.setProperty("--text-area-selection-text-color", "black");

    document.documentElement.style.setProperty("--body-color", "black");
    document.documentElement.style.setProperty("--settings-block-bg-color", "rgba(20, 20, 20, 0.50)");
    document.documentElement.style.setProperty("--black-color", "#00FF00");

    document.documentElement.style.setProperty("--settings-block-btn-bg-color", "#00FF00");
    document.documentElement.style.setProperty("--settings-block-btn-text-color", "black");

    document.documentElement.style.setProperty("--create-text-input-bg-color", "black");
    document.documentElement.style.setProperty("--create-text-input-text-color", "#00FF00");

    document.documentElement.style.setProperty("--scrollbar-thumb-color", "rgba(0, 255, 0, 0.3)");
  }
};

const creationDB = async () => {
  db = await idb.openDb('db', 1, db => db.createObjectStore('notes', {keyPath: 'id'}));

  let notes = await db.transaction('notes').objectStore('notes').getAll();
  if (notes.length > 0) {
    console.log(notes);
    createList(notes);
  } 
}

function createList(note) {
  let main_txt = document.getElementById("main-text-list-blc");
  main_txt.innerHTML = "";

  for (i = 0; i < note.length; i++) {
    let div = document.createElement("div");
    let del_btn = document.createElement('button');
    let btn = document.createElement('button');
    btn.setAttribute("id", `note-btn`);
    del_btn.setAttribute("id", `del-btn-${note[i].id}`);

    btn.innerHTML = `${note[i].id}.${note[i].title} <span>${note[i].date}</span>`;
    del_btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 8C17.5523 8 18 8.44772 18 9V19C18 20.6569 16.6569 22 15 22H9C7.34315 22 6 20.6569 6 19V9C6 8.44772 6.44772 8 7 8H17ZM16 10H8V19C8 19.5523 8.44772 20 9 20H15C15.5523 20 16 19.5523 16 19V10ZM9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3Z" fill="black"/></svg>';

    div.append(btn);
    div.append(del_btn);
    main_txt.append(div);
  }
  buttonEvent();
  deleteButtonEvent();
}

let addNote = async () => {
  if (document.getElementById("mainTextArea").value === '') return;

  let b_len = await db.transaction('notes').objectStore('notes').getAll();

  let note = {
    id : b_len.length + 1,
    title : document.getElementById("create-article-input").value,
    text: document.getElementById("mainTextArea").value,
    date: new Date().toLocaleDateString()
  }

  try {
    await db.transaction('notes', 'readwrite').objectStore('notes').add(note);
    let list = await db.transaction('notes').objectStore('notes').getAll();
    createList(list);
  }
  catch { }
}

// ALL EVENTS
window.onload = function() {
  creationDB();
  themeRadioItems();
  soundRadioItems();
  randomTxtPlaceHolder();
  autoSizeTxtArea();
}

function buttonEvent() {
  document.querySelectorAll("#note-btn").forEach((item) => {
    item.addEventListener("click", async () => {
      let idNum = Number(item.innerHTML[0] - 1);
      let base = await db.transaction('notes').objectStore('notes').getAll();

      document.getElementById("mainTextArea").value = base[idNum].text;
      document.querySelector(".text-title").innerHTML = base[idNum].title;
    });
  });
}

async function deleteButtonEvent() {
  document.querySelectorAll("#main-text-list-blc > div > button:nth-of-type(2)").forEach((item) => {
    item.addEventListener("click", async () => {
      let num = Number(item.id.replace('del-btn-', ''));
      await db.transaction('notes', 'readwrite').objectStore('notes').delete(num);

      let base = await db.transaction('notes').objectStore('notes').getAll();
      let copyBase = base;

      let idNum = 1;
      for (i = 0; i < copyBase.length; i++) {
        copyBase[i].id = idNum;
        idNum += 1;
      }

      await db.transaction('notes', 'readwrite').objectStore('notes').clear("notes");

      for (i = 0; i < copyBase.length; i++) {
        await db.transaction('notes', 'readwrite').objectStore('notes').add(copyBase[i]);
      }

      document.getElementById("main-text-list-blc").value = "";
      let list = await db.transaction('notes').objectStore('notes').getAll().then(location.reload());
    });
  });
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
  if (document.getElementById("theme-radio-1").checked == true) localStorage.setItem("theme-radio", "1");
  else if (document.getElementById("theme-radio-2").checked == true) localStorage.setItem("theme-radio", "2");
  else if (document.getElementById("theme-radio-3").checked == true) localStorage.setItem("theme-radio", "3");
  else if (document.getElementById("theme-radio-4").checked == true) localStorage.setItem("theme-radio", "4");

  if (document.getElementById("sound-radio-1").checked == true) localStorage.setItem("sound-radio", "1");
  else if (document.getElementById("sound-radio-2").checked == true) localStorage.setItem("sound-radio", "2");
});

document.getElementById("header-menu-btn").addEventListener("click", (e) => {if (document.getElementById("main-settings-block").style.transform = "translateX(-100%)") document.getElementById("main-settings-block").style.transform = "translateX(0%)";});
document.getElementById("settings-menu-btn").addEventListener("click", (e) => {if (document.getElementById("main-settings-block").style.transform = "translateX(0%)") document.getElementById("main-settings-block").style.transform = "translateX(-100%)";});
document.getElementById("texts-list-menu-btn").addEventListener("click", (e) => {if (document.getElementById("text-list-menu-blc").style.transform = "translateX(-100%)") document.getElementById("text-list-menu-blc").style.transform = "translateX(0%)";});
document.getElementById("list-menu-back-btn").addEventListener("click", (e) => {if (document.getElementById("text-list-menu-blc").style.transform = "translateX(0%)") document.getElementById("text-list-menu-blc").style.transform = "translateX(-100%)";});

document.getElementById("delete-all-text-btn").addEventListener("click", (e) => document.getElementById("mainTextArea").value = "");
document.getElementById("copy-all-text-btn").addEventListener("click", (e) => navigator.clipboard.writeText(document.getElementById("mainTextArea").value).then(() => console.log('Successful!'), (err) => console.error('not copy: ', err)));

document.getElementById("article-save-btn").addEventListener("click", (e) => addNote());

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
