const getId = id => document.getElementById(id);

const textInput = getId("textInput");
const addBtn = getId("addBtn");
const clearListBtn = getId("clearListBtn");
const listContainer = getId("listContainer");

addBtn.addEventListener("click", () => {
    if (textInput.value && textInput.value != null && textInput.value != undefined && textInput.value != "") {
        let newListItem = document.createElement("li");
        newListItem.textContent = textInput.value;

        let newDelButton = document.createElement("button");
        newDelButton.textContent = "X";
        newDelButton.onclick = function() {this.parentElement.remove()};

        let newClickButton = document.createElement("button");
        newClickButton.textContent = "✔"
        newClickButton.onclick = function() {this.parentElement.style.textDecoration = 'line-through'};

        newListItem.appendChild(newDelButton);
        newListItem.appendChild(newClickButton);

        listContainer.appendChild(newListItem);
    }
})

clearListBtn.onclick = () => listContainer.innerHTML = "";