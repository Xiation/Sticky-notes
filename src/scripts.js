
const notesContainer = document.getElementById("app") ;
const addNoteBtn = document.querySelector(".add-note")

// automatically load existing saved notes prior within the storage
GetNote().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteBtn) ;
    
});


addNoteBtn.addEventListener("click", () => AddNote() );


function GetNote(){
    // get all notes stored inside the local storage
    // default to an empty array at first
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    

} //retrieve existing note from local storage
  //in client's browser

function SaveNote(notes){
    // get all of existing notes and stringify them
    // before it saves them to local
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes)) ;
} // save new notes in the local storage

function createNoteElement (id, content) {
    // create new text area (notes are yet added, only element itself)
    const element = document.createElement("textarea") ;

    element.classList.add("note");
    element.value = content ;
    element.placeholder = "Empty Notes" ;

    element.addEventListener("change", () => {
        UpdateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete this note?") ;

        if (doDelete) {
            DeleteNote(id, element) ;
        }
    });
    return element;
} // build new element (html element) to represent note

function AddNote () {
    const newNotes= GetNote(); // get references of existing note
    const noteObject = {
        id : Math.floor(Math.random() * 100000),
        content: ""
    };

    // represent new note
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteBtn);

    newNotes.push(noteObject);
    SaveNote(newNotes);
} // create new note and simultaneously save it to local storage

function UpdateNote(id, newContent) {
    const notes = GetNote();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    SaveNote(notes);
} // update existing note

function DeleteNote(id, element) {
    const notes = GetNote().filter(note => note.id != id);

    SaveNote(notes);
    // remove notes/text area from page
    notesContainer.removeChild(element); 
} // remove existing note