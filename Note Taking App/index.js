const getId = id => document.getElementById(id);

let noteAmount = 0;

const textInput = getId("textInput");
const submitBtn = getId("submitBtn");
const notes = getId("notes");

const modal = getId("myModal")
const modalText = getId("modalText")
const close = getId("close")

submitBtn.onclick = () => {
    if (!textInput.value) {
        alert("Note must have content!");
        return;
    }
    noteAmount++;

    const note = document.createElement("div");
    note.classList.add("note");

    const noteTitle = document.createElement("h3");
    noteTitle.textContent = `Note ${noteAmount}`;
    noteTitle.classList.add("noteTitle");

    const noteDesc = document.createElement("p");
    const actualTextContent = `${textInput.value}`;
    noteDesc.textContent = actualTextContent;
    
    noteDesc.classList.add("noteDesc");

    const detailButton = document.createElement("p");
    detailButton.textContent = "View Detail";
    detailButton.classList.add("detailBtn");
    detailButton.onclick = () => {showDetail(actualTextContent)};

    note.appendChild(noteTitle);
    note.appendChild(noteDesc);
    note.appendChild(detailButton);

    notes.appendChild(note);
    if (isOverflowing(noteDesc)) {
        console.log("Text is overflowing")
        noteDesc.textContent = truncateToTwoLines(noteDesc, actualTextContent);
    }
}

function isOverflowing(element) {
    return element.scrollHeight > element.clientHeight;
}

function truncateToTwoLines(element, text) {
    const width = element.offsetWidth;
    const charWidth = 8.75;
    const maxChars = Math.floor(width / charWidth) * 2;
    
    let newText = text;
    if (newText.length > maxChars) {
        console.log("Truncate")
        newText = newText.substring(0, maxChars) + '...';
        return newText;
    } else if (isOverflowing(element)) {
        newText = '...';
        return newText;
    }
    console.log("Dont truncate")
    return text;
}

function showDetail(text) {
    modal.style.display = 'block';
    modalText.textContent = text;
}

close.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    textInput.value = "";
    textInput.addEventListener("input", function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

window.addEventListener("resize", adjustTextArea);

function adjustTextArea() {
    if (window.innerWidth <= 740) {
        textInput.rows = 5;
    } else {
        textInput.rows = 2;
    }
}

adjustTextArea();