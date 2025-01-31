const financialData = JSON.parse(localStorage.getItem("financialData"));
console.log(financialData);


const companyName = document.querySelector("#companyName");
const address = document.querySelector("#address");
const dateCreated = document.querySelector('#dateCreated');
const dateIssued = document.querySelector('#dateIssued');
const generateAnother = document.querySelector('#generateAnother');



/*Assign inputs from step 1 */
companyName.textContent = financialData.companyName;
address.textContent = financialData.address;
dateCreated.textContent = financialData.dateCreated;
dateIssued.textContent = financialData.dateIssued



// Populate revenue section
const revenueContainer = document.querySelector(".financialReportMain");

// Add revenue items dynamically
const revenueHeading = document.querySelector(".financialReportHeading"); 
const totalRevenueContainer = revenueHeading.nextElementSibling.nextElementSibling;
let totalRevenue = 0;

financialData.step2Items.forEach(item => {
    // Create a new row for each revenue item
    const revenueRow = document.createElement("div");
    revenueRow.classList.add("categoryAmount");
    revenueRow.innerHTML = `
        <p class="revenueCategory">${item.category}</p>
        <p class="alignRight revenueAmount">$${parseFloat(item.number).toFixed(2)}</p>
    `;

    // Insert before the total revenue row
    revenueContainer.insertBefore(revenueRow, totalRevenueContainer);

    // Update total revenue
    totalRevenue += parseFloat(item.number);
});

// Update total revenue value
const totalRevenueElement = totalRevenueContainer.querySelector(".alignRight");
totalRevenueElement.textContent = `$${totalRevenue.toFixed(2)}`;




// Populate expenses section
const expensesHeading = document.querySelector(".financialReportHeading:nth-of-type(2)"); 
const totalExpensesContainer = expensesHeading.nextElementSibling.nextElementSibling;
let totalExpenses = 0;


financialData.step3Items.forEach(item => {
    // Create a new row for each expense item
    const expenseRow = document.createElement("div");
    expenseRow.classList.add("categoryAmount");
    expenseRow.innerHTML = `
        <p>${item.category}</p>
        <p class="alignRight">$${parseFloat(item.number).toFixed(2)}</p>
    `;

    // Insert before the total expenses row
    revenueContainer.insertBefore(expenseRow, totalExpensesContainer);

    // Update total expenses
    totalExpenses += parseFloat(item.number);
});

financialData.step4Items.forEach(item => {
    // Create a new row for each expense item
    const expenseRow = document.createElement("div");
    expenseRow.classList.add("categoryAmount");
    expenseRow.innerHTML = `
        <p>${item.category}</p>
        <p class="alignRight">$${parseFloat(item.number).toFixed(2)}</p>
    `;

    // Insert before the total expenses row
    revenueContainer.insertBefore(expenseRow, totalExpensesContainer);

    // Update total expenses
    totalExpenses += parseFloat(item.number);
});

financialData.step5Items.forEach(item => {
    // Create a new row for each expense item
    const expenseRow = document.createElement("div");
    expenseRow.classList.add("categoryAmount");
    expenseRow.innerHTML = `
        <p>${item.category}</p>
        <p class="alignRight">$${parseFloat(item.number).toFixed(2)}</p>
    `;

    // Insert before the total expenses row
    revenueContainer.insertBefore(expenseRow, totalExpensesContainer);

    // Update total expenses
    totalExpenses += parseFloat(item.number);
});

financialData.step6Items.forEach(item => {
    // Create a new row for each expense item
    const expenseRow = document.createElement("div");
    expenseRow.classList.add("categoryAmount");
    expenseRow.innerHTML = `
        <p>${item.category}</p>
        <p class="alignRight">$${parseFloat(item.number).toFixed(2)}</p>
    `;

    // Insert before the total expenses row
    revenueContainer.insertBefore(expenseRow, totalExpensesContainer);

    // Update total expenses
    totalExpenses += parseFloat(item.number);
});

// Update total expenses value
const totalExpensesElement = totalExpensesContainer.querySelector(".alignRight");
totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;




// Calculate EBT
const ebt = totalRevenue - totalExpenses;

// Populate the EBT value in the existing element
const ebtElement = document.querySelector("#ebtValue"); // Use the correct ID or class
if (ebtElement) {
    ebtElement.textContent = `${ebt.toFixed(2)}`;
}

// Calculate Net Profit

let taxRate = financialData.taxRate;

// Debugging: Log the tax rate value
console.log("Tax Rate:", taxRate);

if (isNaN(taxRate) || taxRate === undefined || taxRate === null) {
    taxRate = 0; // Fallback to 0 if taxRate is invalid
}

// Calculate Net Profit
const netProfit = ebt - ebt * taxRate/100

// Debugging: Log the Net Profit calculation
console.log("EBT:", ebt, "Tax Rate:", taxRate, "Net Profit:", netProfit);

// Populate the Net Profit value in the existing element
const netProfitElement = document.querySelector("#netProfitValue"); // Use the correct ID or class
if (netProfitElement) {
    netProfitElement.textContent = `${netProfit.toFixed(2)}`;
}

document.getElementById("downloadPDF").addEventListener("click", () => {
    // Chọn phần tử chứa báo cáo cần chuyển thành PDF
    const reportElement = document.querySelector(".financialReportContainer");

    // Tùy chọn cấu hình PDF
    const options = {
        margin: 0, // Lề trong file PDF
        filename: 'financial_report.pdf', // Tên file PDF
        image: { type: 'jpg', quality: 0.98 }, // Chất lượng hình ảnh
        html2canvas: { scale: 2 }, // Độ phân giải cao hơn
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Định dạng trang
    };

    // Chuyển đổi HTML thành PDF và tải về
    html2pdf().set(options).from(reportElement).save();
});

generateAnother.addEventListener("click", (e)=>{
    console.log("log sth");
    
    window.location.href = "../html/fillInfo.html";

});