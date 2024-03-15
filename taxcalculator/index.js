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
    creditsInput.value = 0;
}

document.addEventListener("DOMContentLoaded", () => {
    deductionChoices.forEach(choice => {
        choice.addEventListener("change", (event) => {
            selectedDeduction = event.target.value;
            if (selectedDeduction == itemizeDeduction.value) {
                deductionInput.removeAttribute("readonly");
                deductionInput.value = 0;
            } else {
                deductionInput.setAttribute("readonly", "");
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
const totalTaxCol = getId("totalTaxCol");
const marginalTaxCol = getId("marginalTaxCol");
const effectiveTaxCol = getId("effectiveTaxCol");

const withholdedTaxesDisplay = getId("withholdedTaxes");
const taxResult = getId("taxResult")

function calulateTax() {
    const grossIncome = grossIncomeInput.value;
    let taxableIncome = grossIncome - deductionInput.value;
    if (taxableIncome <= 0) {
        taxableIncome = 0;
        marginalTaxCol.textContent = "N/A?";
        bracket10Col.textContent = 0;
        bracket12Col.textContent = 0;
        bracket22Col.textContent = 0;
    } else if (taxableIncome <= 11000) {
        marginalTaxCol.textContent = "10%";
        bracket10Col.textContent = taxableIncome * 0.10;
        bracket12Col.textContent = 0;
        bracket22Col.textContent = 0;
    } else if (taxableIncome <= 44725) {
        marginalTaxCol.textContent = "12%";
        bracket10Col.textContent = (11000 - 0) * 0.10;
        bracket12Col.textContent = (taxableIncome - 11000) * 0.12;
        bracket22Col.textContent = 0;
    } else if (taxableIncome > 44725) {
        marginalTaxCol.textContent = "22%";
        bracket10Col.textContent = (11000 - 0) * 0.10;
        bracket12Col.textContent = (44725 - 11000) * 0.12;
        bracket22Col.textContent = (taxableIncome - 44725) * 0.22;
    }

    taxableIncomeCol.textContent = taxableIncome;
    const totalTax = (Number(bracket10Col.textContent) + Number(bracket12Col.textContent) + Number(bracket22Col.textContent) - creditsInput.value).toFixed(2);
    totalTaxCol.textContent = totalTax;
    effectiveTaxCol.textContent = `${((totalTax/taxableIncome) * 100).toFixed(2)}%`;

    const withholdedTaxes = Number(withholdedTaxesInput.value) || 0;
    withholdedTaxesDisplay.textContent = `$${withholdedTaxes}`;

    if (withholdedTaxes > totalTax) {
        taxResult.style.color = 'green';
        taxResult.textContent = `be refunded $${(withholdedTaxes - totalTax).toFixed(2)}`;
    } else {
        taxResult.style.color = 'red';
        taxResult.textContent = `owe $${(totalTax - withholdedTaxes).toFixed(2)}`;
    }
}

// 10% 0 to 11,000
// 12% 11,000 to 44,725
// 22% 44,725 or more

// https://www.phind.com/search?cache=qi9rbxgej6ihuy03azeu0cgf