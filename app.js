const addNewNoteBtn = document.getElementById("main-Btn");
addNewNoteBtn.addEventListener("click", () => addNewNote());

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
        <button class="edit">EDIT</button>
        <button class="delete">DELETE</button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  `;
  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  delBtn.addEventListener("click", () => {
    note.remove();
    updateNotes();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.value = text;
  main.innerHTML = text

  textArea.addEventListener("input", (e) => {
    main.innerHTML = e.target.value;
    updateNotes();
  });

  document.body.appendChild(note);
}

function updateNotes() {
  const textNote = document.querySelectorAll("textarea");

  const notes = [];

  textNote.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
