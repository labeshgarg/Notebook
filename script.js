displayNotes(); //To display notes if any from the local storage when opening the page for the first time

// Function to add the title and the content into the local storage
let addBtn = document.getElementById("addTxt");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("textarea");
  let addTitle = document.getElementById("title");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObject = [];
  } else {
    notesObject = JSON.parse(notes);
  }
  let titleDescObject = {
      title: addTitle.value,
      desc: addTxt.value
  }

  notesObject.push(titleDescObject);
  localStorage.setItem("notes", JSON.stringify(notesObject));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObject);
  displayNotes();
});

// Function to display the notes.
function displayNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObject = [];
  } else {
    notesObject = JSON.parse(notes);
  }
  let html = "";
  notesObject.forEach(function (element, index) {
    //   The note card html which will be displayed after creating the note.
    html += `
            <div class="display-note">
                <div class="note-body">
                    <h4 class="note-title">${element.title}</h4>
                    <p class="note-content">${element.desc}</p>
                    <button onclick="deleteNote(this.id)" id="${index}" class="delete">Delete</button>
                </div>
            </div>`;
  });
  let noteElement = document.getElementById("notes");
  if (notesObject.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML = `Nothing to display. No notes.`;
  }
}

// Function to delete the node.
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObject = [];
    } else {
      notesObject = JSON.parse(notes);
    }
    notesObject.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    displayNotes()
}
// Searching a note based on the content from the search bar input
let searchNote = document.getElementById("search-note");
searchNote.addEventListener("input", function(){
    
    let inputValue = searchNote.value;
    let noteCards = document.getElementsByClassName("display-note");
    Array.from(noteCards).forEach(function(element){
        let noteText = element.getElementsByTagName("p")[0].innerText;
        console.log(noteText)
        if (noteText.includes(inputValue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        
    })
})
// DARK MODE-LIGHT  MODE FUNCTION
function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
