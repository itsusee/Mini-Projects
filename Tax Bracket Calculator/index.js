const getId = id => document.getElementById(id);

const grossIncomeInput = getId("grossIncomeInput");

const afterDeductCol = getId("afterDeductCol");
const bracket10Col = getId("bracket10Col");
const bracket12Col = getId("bracket12Col");
const bracket22Col = getId("bracket22Col");

function calulateTax() {
    const grossIncome = Number(grossIncomeInput.value);
    let incomeAfterDeductions = grossIncome - 13850;
    if (incomeAfterDeductions <= 0) incomeAfterDeductions = 0;
    let totalMoney = incomeAfterDeductions;

    afterDeductCol.textContent = incomeAfterDeductions;

    var bracket10 = totalMoney - 11000;
    totalMoney = totalMoney - 11000;
}