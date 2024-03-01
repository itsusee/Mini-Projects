const getId = id => document.getElementById(id);

const nameInput = getId("nameInput");
const dateInput = getId("dateInput");
const amountInput = getId("amountInput");

const submitBtn = getId("submitBtn");
const expenseTable = getId("expenseTable");

const nothingPlaceHolder = document.createElement("tr");
let nothingPlaceHolderContent = document.createElement("td");
nothingPlaceHolderContent.id = 'placeholder';
nothingPlaceHolderContent.style.border = 'none';
nothingPlaceHolderContent.textContent = 'No expenses';
nothingPlaceHolder.appendChild(nothingPlaceHolderContent);

window.onload = () => {
    nameInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
}

submitBtn.onclick = () => {
    if (!nameInput.value || !dateInput.value || !amountInput.value) {
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
    newDelColButton.onclick = function() {
        this.parentElement.parentElement.remove();
    }
    newDelColButton.textContent = "X";
    newDelCol.appendChild(newDelColButton);

    newExpense.appendChild(name);
    newExpense.appendChild(date);
    newExpense.appendChild(amount);
    newExpense.appendChild(newDelCol);

    newExpense.addEventListener("mouseover", function() {this.style.backgroundColor = 'hsl(0, 0%, 90%)'})
    newExpense.addEventListener("mouseout", function() {this.style.backgroundColor = 'hsl(0, 0%, 96%)'})

    expenseTable.appendChild(newExpense)
}

const observer = new MutationObserver(() => {
    if (expenseTable.children.length == 1) {
        expenseTable.appendChild(nothingPlaceHolder);
    }
});

observer.observe(expenseTable, {
    subtree: true,
    childList: true,
    characterData: true,
    attributeOldValue: true
});

expenseTable.appendChild(nothingPlaceHolder);
