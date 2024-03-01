const getId = id => document.getElementById(id);

const formContainerInput = getId("formContainer");
const nameInput = getId("nameInput");
const dateInput = getId("dateInput");
const amountInput = getId("amountInput");

const submitBtn = getId("submitBtn");
const delAllBtn = getId("delAllBtn");

const expenseTable = getId("expenseTable");

const nothingPlaceHolder = document.createElement("tr");
let nothingPlaceHolderContent = document.createElement("td");
nothingPlaceHolderContent.id = "placeholder";
nothingPlaceHolderContent.style.border = 'none';
nothingPlaceHolderContent.textContent = "No expenses detected";
nothingPlaceHolder.appendChild(nothingPlaceHolderContent);

document.addEventListener("DOMContentLoaded", () => {
    expenseTable.appendChild(nothingPlaceHolder);
    nameInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
    formContainerInput.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            submit();
        }
    });
});

function submit() {
    if (!nameInput.value || !dateInput.value || !amountInput.value) {
        alert("All fields must be filled!");
        return;
    }

    if (isNaN(Number(amountInput.value))) {
        alert("Amount must be a number!");
        return;
    }

    if (document.getElementById("placeholder") != null) { // Removes placeholder row if it exists
        nothingPlaceHolder.remove();
    }

    let newExpense = document.createElement("tr");

    let name = document.createElement("td");
    name.textContent = nameInput.value;
    let date = document.createElement("td");
    date.textContent = dateInput.value
    let amount = document.createElement("td");
    amount.textContent = `$${amountInput.value}`;
    let newDelCol = document.createElement("td");
    let newDelColButton = document.createElement("button");
    newDelColButton.textContent = "X";
    newDelCol.appendChild(newDelColButton);

    newExpense.appendChild(name);
    newExpense.appendChild(date);
    newExpense.appendChild(amount);
    newExpense.appendChild(newDelCol);
    newDelColButton.onclick = () => newExpense.remove();

    newExpense.addEventListener("mouseover", function() {this.style.backgroundColor = 'hsl(0, 0%, 90%)'});
    newExpense.addEventListener("mouseout", function() {this.style.backgroundColor = 'hsl(0, 0%, 96%)'});

    expenseTable.appendChild(newExpense);
}

submitBtn.onclick = submit;

delAllBtn.onclick = () => {
    if (expenseTable.children.length > 1) {
        for (let i = expenseTable.children.length - 1; i > 0; i--) {
            expenseTable.removeChild(expenseTable.children[i]);
        }
    }
}

const observer = new MutationObserver(() => {
    if (expenseTable.children.length == 1) {
        expenseTable.appendChild(nothingPlaceHolder);
    }
});

observer.observe(expenseTable, {
    subtree: true,
    childList: true
});