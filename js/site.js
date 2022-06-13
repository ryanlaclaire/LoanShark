//Get the values from the Page
//Start of Controller function
function getValues() {
    //get values from the page
    let loanAmount = document.getElementById("loanAmount").value;
    let months = document.getElementById("months").value;
    let interestRate = document.getElementById("interestRate").value;

    //Validate data from input
    //attempt to parse into INT
    loanAmount = parseInt(loanAmount);
    months = parseInt(months);
    interestRate = parseInt(interestRate);

    //if statement to validate data
    if(Number.isInteger(loanAmount) && Number.isInteger(months) && Number.isInteger(interestRate)) {

        //All is good and continue
        // calculate Monthly Payment
        //let monthlyPayment = monthPayment(loanAmount, months, interestRate);
        //call loanSchedule()
        let loanData = loanCalc(loanAmount, months, interestRate);
        //call displayLoan()
        displayLoan(loanData);

    }else{
        alert("You must enter valid numbers.")
    }

}

//Generate amortization schedule for length of loan
//Logic function(s)
function loanCalc(loanAmount, months, rate) {
    //calculate monthly payment
    let monthlyPayment = (loanAmount) * (rate/1200) / (1 - Math.pow((1 + rate/1200), -months));
    monthlyPayment = Math.round((monthlyPayment + Number.EPSILON) * 100) / 100;

    //create empty array
    let loanPayments = [];
    let month = 1;
    let interest = Math.round(((loanAmount * (rate/1200)) + Number.EPSILON) * 100) / 100;
    let totInterest = interest;
    let principal = Math.round(((monthlyPayment - interest) + Number.EPSILON) * 100) / 100;
    let balance = Math.round(((loanAmount - principal) + Number.EPSILON) * 100) / 100;
    let loanPayment = {};

    //we want to get all payment data for each month.
    for (let i = 1; i <= months; i++){
        //loops until conditions are true
        loanPayment = {
            "month": month,
            "payment": monthlyPayment,
            "principal": principal,
            "interest": interest,
            "totInterest": totInterest,
            "balance": balance
        };
      
        loanPayments.push(loanPayment);

        if( month < months){
        month += 1;
        interest = Math.round(((balance * (rate/1200)) + Number.EPSILON) * 100) / 100;
        totInterest = Math.round(((totInterest + interest) + Number.EPSILON) * 100) / 100;
        principal = Math.round(((monthlyPayment - interest) + Number.EPSILON) * 100) / 100;
        balance = Math.round(((balance - principal) + Number.EPSILON) * 100) / 100;
        }
        
    }

    return {
        'totInterest': totInterest, 
        'loanPayments': loanPayments,
        'monthlyPayment': monthlyPayment,
        'loanAmount': loanAmount
    };
}

//Display or view functions
function displayLoan(loanData) {  

    let totInterest = loanData.totInterest;
    let paymentSchedule = loanData.loanPayments;
    let principal = loanData.loanAmount;
    let payment = loanData.monthlyPayment;

    let totCost = principal + totInterest;
    //Get table element
    document.getElementById("payment").innerHTML = `$ ${payment}`;
    document.getElementById('principal').innerHTML = `$ ${principal}`;
    document.getElementById('totInterest').innerHTML = `$ ${totInterest}`;
    document.getElementById('totCost').innerHTML = `$ ${totCost}`;


    let tableBody = document.getElementById("results");
    //clear table first to ensure correct data is displayed
    tableBody.innerHTML = "";

    for (let index = 0; index < paymentSchedule.length; index ++) {

            let tableRow = document.createElement('tr');

            let rowData1 = document.createElement('td');
            rowData1.innerHTML = paymentSchedule[index].month;
            let rowData2 = document.createElement('td');
            rowData2.innerHTML = paymentSchedule[index].payment;
            let rowData3 = document.createElement('td');
            rowData3.innerHTML = paymentSchedule[index].principal;
            let rowData4 = document.createElement('td');
            rowData4.innerHTML = paymentSchedule[index].interest;
            let rowData5 = document.createElement('td');
            rowData5.innerHTML = paymentSchedule[index].totInterest;
            let rowData6 = document.createElement('td');
            rowData6.innerHTML = paymentSchedule[index].balance;

            tableRow.appendChild(rowData1);
            tableRow.appendChild(rowData2);
            tableRow.appendChild(rowData3);
            tableRow.appendChild(rowData4);
            tableRow.appendChild(rowData5);
            tableRow.appendChild(rowData6);

            tableBody.appendChild(tableRow);
        }

}