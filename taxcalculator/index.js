const getId = id => document.getElementById(id);

const grossIncomeInput = getId("grossIncomeInput");
const deductionInput = getId("deductionInput");
const standardDeduction = getId("standardDeduction");
const itemizeDeduction = getId("itemizeDeduction");
const creditsInput = getId("creditsInput");
const withholdedTaxesInput = getId("withholdedTaxesInput");

const deductionChoices = document.querySelectorAll("input[type='radio']");
const numberInputs = document.querySelectorAll("input[type='number']");

let selectedDeduction = standardDeduction.value;

window.onload = () => {
    standardDeduction.checked = true;
    itemizeDeduction.checked = false;
    deductionInput.value = 13850;
    deductionInput.classList.add("dontShowArrows");
}

document.addEventListener("DOMContentLoaded", () => {
    deductionChoices.forEach(choice => {
        choice.addEventListener("change", (event) => {
            selectedDeduction = event.target.value;
            if (selectedDeduction == itemizeDeduction.value) {
                deductionInput.removeAttribute("readonly");
                deductionInput.classList.remove("dontShowArrows");
                deductionInput.value = 0;
            } else {
                deductionInput.setAttribute("readonly", "");
                deductionInput.classList.add("dontShowArrows");
                deductionInput.value = 13850;
            }
        })
    })
    
    numberInputs.forEach(input => {
        input.pattern = "[0-9\.\-]*";
    })
})

const taxableIncomeCol = getId("taxableIncomeCol");

const bracket10Col = getId("bracket10Col");
const bracket12Col = getId("bracket12Col");
const bracket22Col = getId("bracket22Col");
const bracket24Col = getId("bracket24Col");
const bracket32Col = getId("bracket32Col");
const bracket35Col = getId("bracket35Col");
const bracket37Col = getId("bracket37Col");

const totalTaxCol = getId("totalTaxCol");
const marginalTaxCol = getId("marginalTaxCol");
const effectiveTaxCol = getId("effectiveTaxCol");

const withholdedTaxesDisplay = getId("withholdedTaxes");
const taxResult = getId("taxResult")

function calulateTax() {
    const grossIncome = grossIncomeInput.value;
    const deduction = deductionInput.value;
    const credits = Number(creditsInput.value) || 0;
    const withholdedTaxes = Number(withholdedTaxesInput.value) || 0;

    let taxableIncome = grossIncome - deduction;
    if (taxableIncome <= 0) taxableIncome = 0;

    let taxBrackets = {
        bracket10: 0,
        bracket12: 0,
        bracket22: 0,
        bracket24: 0,
        bracket32: 0,
        bracket35: 0,
        bracket37: 0,
    };

    if (taxableIncome <= 11000) {
        marginalTaxCol.textContent = "10%";
        taxBrackets.bracket10 = taxableIncome * 0.10;
    } else if (taxableIncome <= 44725) {
        marginalTaxCol.textContent = "12%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (taxableIncome - 11000) * 0.12;
    } else if (taxableIncome <= 93375) {
        marginalTaxCol.textContent = "22%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (44725 - 11000) * 0.12;
        taxBrackets.bracket22 = (taxableIncome - 44725) * 0.22;
    } else if (taxableIncome <= 182100) {
        marginalTaxCol.textContent = "24%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (44725 - 11000) * 0.12;
        taxBrackets.bracket22 = (93375 - 44725) * 0.22;
        taxBrackets.bracket24 = (taxableIncome - 93375) * 0.24;
    } else if (taxableIncome <= 231250) {
        marginalTaxCol.textContent = "32%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (44725 - 11000) * 0.12;
        taxBrackets.bracket22 = (93375 - 44725) * 0.22;
        taxBrackets.bracket24 = (182100 - 93375) * 0.24;
        taxBrackets.bracket32 = (taxableIncome - 182100) * 0.32;
    } else if (taxableIncome <= 578125) {
        marginalTaxCol.textContent = "35%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (44725 - 11000) * 0.12;
        taxBrackets.bracket22 = (93375 - 44725) * 0.22;
        taxBrackets.bracket24 = (182100 - 93375) * 0.24;
        taxBrackets.bracket32 = (231250 - 182100) * 0.32;
        taxBrackets.bracket35 = (taxableIncome - 231250) * 0.35;
    } else {
        marginalTaxCol.textContent = "37%";
        taxBrackets.bracket10 = 11000 * 0.10;
        taxBrackets.bracket12 = (44725 - 11000) * 0.12;
        taxBrackets.bracket22 = (93375 - 44725) * 0.22;
        taxBrackets.bracket24 = (182100 - 93375) * 0.24;
        taxBrackets.bracket32 = (231250 - 182100) * 0.32;
        taxBrackets.bracket35 = (578125 - 231250) * 0.35;
        taxBrackets.bracket37 = (taxableIncome - 578125) * 0.37;
    }

    let totalTax = 0;
    for (var [_bracket, total] of Object.entries(taxBrackets)) {
        totalTax += total;
    }
    totalTax = (totalTax - credits).toFixed(2);

    let effectiveTaxRate = ((totalTax / taxableIncome) * 100).toFixed(2);
    if (isNaN(effectiveTaxRate)) effectiveTaxRate = 0;
    if (taxableIncome <= 0) marginalTaxCol.textContent = "0%";

    taxableIncomeCol.textContent = taxableIncome.toFixed(2);
    bracket10Col.textContent = taxBrackets.bracket10.toFixed(2); //
    bracket12Col.textContent = taxBrackets.bracket12.toFixed(2);
    bracket22Col.textContent = taxBrackets.bracket22.toFixed(2);
    bracket24Col.textContent = taxBrackets.bracket24.toFixed(2);
    bracket32Col.textContent = taxBrackets.bracket32.toFixed(2);
    bracket35Col.textContent = taxBrackets.bracket35.toFixed(2);
    bracket37Col.textContent = taxBrackets.bracket37.toFixed(2); //
    totalTaxCol.textContent = totalTax;
    effectiveTaxCol.textContent = `${effectiveTaxRate}%`;
    withholdedTaxesDisplay.textContent = `$${withholdedTaxes.toFixed(2)}`;

    if (withholdedTaxes > totalTax) {
        taxResult.style.color = 'green';
        taxResult.textContent = `be refunded $${(withholdedTaxes - totalTax).toFixed(2)}`;
    } else if (totalTax == withholdedTaxes) {
        taxResult.style.color = 'black';
        taxResult.textContent = `not be refunded nor owe any taxes, perfect zero!`;
    } else {
        taxResult.style.color = 'red';
        taxResult.textContent = `owe $${(totalTax - withholdedTaxes).toFixed(2)}`;
    }
}

// https://www.phind.com/search?cache=qi9rbxgej6ihuy03azeu0cgf