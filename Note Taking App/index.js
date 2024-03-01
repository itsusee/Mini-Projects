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
    noteDesc.textContent = `${textInput.value}`;
    noteDesc.classList.add("noteDesc");

    const detailButton = document.createElement("p");
    detailButton.textContent = "View Detail";
    detailButton.classList.add("detailBtn");
    detailButton.onclick = () => {showDetail(noteDesc.textContent)};

    note.appendChild(noteTitle);
    note.appendChild(noteDesc);
    note.appendChild(detailButton);

    notes.appendChild(note);

    if (isOverflowing(noteDesc)) {
        console.log('The paragraph is overflowing.');
    }
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

function isOverflowing(element) {
    // Ensure the element is a DOM element
    if (!(element instanceof Element)) {
        throw new Error('The argument must be a DOM element.');
    }

    // Compare the scroll height and client height
    return element.scrollHeight > element.clientHeight;
}

// <textarea id="dynamicTextarea" rows="4" cols="50" style="resize: none;"></style>
/*
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('dynamicTextarea');

    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset the height to auto to shrink the textarea
        this.style.height = this.scrollHeight + 'px'; // Set the height to the scrollHeight to expand the textarea
    });
});
*/

/*
function truncateToTwoLines(element) {
    // Ensure the element is a DOM element
    if (!(element instanceof Element)) {
        throw new Error('The argument must be a DOM element.');
    }

    // Check if the element is overflowing
    if (!isOverflowing(element)) {
        return; // No need to truncate if it's not overflowing
    }

    // Calculate the width of the element
    const width = element.offsetWidth;

    // Calculate the approximate width of a character
    // This is a rough estimate and might need adjustment based on the font
    const charWidth = 8; // Adjust this value based on your font

    // Calculate the maximum number of characters that can fit in two lines
    const maxChars = Math.floor(width / charWidth) * 2;

    // Truncate the text to fit within the two-line limit
    let text = element.textContent;
    if (text.length > maxChars) {
        text = text.substring(0, maxChars) + '...';
        element.textContent = text;
    }
}

// Example usage:
// Assuming there's a <p> element with the id "myParagraph"
const myParagraph = document.getElementById('myParagraph');
truncateToTwoLines(myParagraph);
*/