const getId = id => document.getElementById(id);

const nameInput = getId("nameInput");
const dateInput = getId("dateInput");
const amountInput = getId("amountInput");

const submitBtn = getId("submitBtn");
const expenseTable = getId("expenseTable");

submitBtn.onclick = () => {
    let newExpense = document.createElement("tr");
    let name = document.createElement("td");
    name.textContent = nameInput.value;
    let date = document.createElement("td");
    date.textContent = dateInput.value
    let amount = document.createElement("td");
    amount.textContent = amountInput.value;

    newExpense.appendChild(name);
    newExpense.appendChild(date);
    newExpense.appendChild(amount);

    expenseTable.appendChild(newExpense);
}