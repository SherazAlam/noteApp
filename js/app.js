console.log("Welcome to Notes App");
display();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";
    display();
})
function display() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        if (!Array.isArray(element)){
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 21rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id = "${index}" onclick = delNote(this.id) class="btn btn-primary">Delete Note</button>
                        <button id = "imp${index}" onclick = markImp(this.id) class="btn btn-primary">Mark Important</button>
                    </div>
            </div>`;
        }
        else{
            html += `
            <div class="noteCard my-2 mx-2 card" style="width: 21rem ; background-color: red;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element[0]}</p>
                        <button id = "${index}" onclick = delNote(this.id) class="btn btn-primary">Delete Note</button>
                        <button id = "imp${index}" onclick = markImp(this.id) class="btn btn-primary">Unmark Important</button>
                    </div>
            </div>`;
        }
    });
    let noteElem = document.getElementById("notes");
    if (noteObj.length != 0) {
        noteElem.innerHTML = html;
    }
    else {
        noteElem.innerHTML = `Nothing to show here! Use "Add a Note" section above to Add Note.`;
    }
}
function delNote(index) {
    console.log(`I am deleting note ${index}`);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    display();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let searchValue = search.value.toLowerCase();
    console.log("event fired", searchValue);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let noteTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (noteTxt.includes(searchValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

function markImp(id){
    let impNote = document.getElementById(id);
    console.log("parent", impNote.parentElement);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let index = parseInt(id.slice(3,id.length));
    if (!Array.isArray(noteObj[index])){
    noteObj[index] = [noteObj[index], "Imp"];
    localStorage.setItem("notes", JSON.stringify(noteObj));
    impNote.parentElement.parentElement.style.backgroundColor = "red";
    impNote.innerText = "Unmark Important";
    }
    else{
        noteObj[index] = noteObj[index][0];
    localStorage.setItem("notes", JSON.stringify(noteObj));
    impNote.parentElement.parentElement.style.backgroundColor = "white";
    impNote.innerText = "Mark Important";
    }
    //display();
}