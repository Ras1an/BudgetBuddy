

let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

let balance = Number(localStorage.getItem("balance"));
let income = Number(localStorage.getItem("income"));
let expense = Number(localStorage.getItem("expense"));

document.addEventListener("DOMContentLoaded", event => {
    RenderUserData();

    const expenseInterval = document.getElementById("expenseInterval");

    let interval = localStorage.getItem("selectedInterval") || "All";
    expenseInterval.value = interval;
    let {first, last} = getExpenses(interval);
    console.log(first, last);
    RenderExpenses(first, last);


    expenseInterval.addEventListener("change", function(){
        interval = expenseInterval.value;
        localStorage.setItem("selectedInterval", interval);
        const {first, last} = getExpenses(interval);
        RenderExpenses(first, last);
    });

    const incomeBtn = document.getElementById("income");

    incomeBtn.onclick = function (){
        let message = "Enter Your Income:";
        let userInput;
        let incomeInput;
        while(true){
            userInput = prompt(`${message}`);
            if(userInput === null)
                return;

            incomeInput = Number(userInput);
            if(!isNaN(incomeInput)){
                break;
            }
            message = "Invalid Input\nEnter Your Income:";
        }

        income = incomeInput;
        balance = income - expense;
        
         localStorage.setItem("income", income);
         localStorage.setItem("balance", balance);
         RenderUserData();

    }

});


function isSameDay(d1, d2){
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
}

function isSameMonth(d1, d2){
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth());
}


function getExpenses(interval){
        console.log(interval);
        let first = -1, last = -1;
        const currentDate = new Date();
        if(interval === "Today"){
            for(let i = expenses.length - 1 ; i >= 0 ; i--){
                let expenseDate = new Date(expenses[i].date);
                if(last === -1 && isSameDay(expenseDate, currentDate))
                    last = i;
                if(isSameDay(expenseDate, currentDate))
                    first = i;
                else
                    break;
            }
        }
        else if(interval == "Month"){
             for(let i = expenses.length - 1 ; i >= 0 ; i--){
                
                let expenseDate = new Date(expenses[i].date);
                if(last === -1 && isSameMonth(expenseDate, currentDate)){
                    console.log("first case");
                    console.log("dsffhds");
                    console.log("First: ", first, "Last: ", last);
                    last = i;
                }
                if(isSameMonth(expenseDate, currentDate)){
                    console.log("first case");
                    first = i;
                    console.log("First: ", first, "Last: ", last);
                }
                else{console.log("first case");
                    break;
                }
            }   
        }
        else{
            first = 0;
            last = expenses.length - 1;
        }  

        console.log(first, last);
        return {first, last};
    }


function RenderExpenses(first, last){
    const expenseContainer = document.getElementById("expenseList");
    expenseContainer.innerHTML = "";
    if(first == -1 && last == -1)
        return;
    console.log(expenses);
    for(let i = last; i >= first ; i--){
        let exp = expenses[i];
        const div = document.createElement("div");
        div.classList = "expenseItem";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList = "RecordBtn";
        editBtn.onclick = () => EditExpense(i);

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList = "RecordBtn";
        deleteBtn.onclick = () => DeleteExpense(i);

        div.innerHTML = `
        <span>${exp.name}</span>
        <span>${exp.category}</span>
        <span>${exp.amount}</span>`;
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);

        expenseContainer.appendChild(div);
    }
    
}

async function RenderUserData(){
    
        const balanceElement = document.getElementById("balance");
        const incomeElement = document.getElementById("income");
        const expenseElement = document.getElementById("expense");

        
        balanceElement.textContent = `Balance: ${balance}$`;
        incomeElement.textContent = `Income: ${income}$`;
        expenseElement.textContent = `Expense: ${expense}$`;
    
}




function DeleteExpense(index){
    
    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    let amount = expenses[index].amount;

    balance += Number(amount);
    expense -= Number(amount);

    localStorage.setItem("balance", balance);
    localStorage.setItem("expense", expense);

    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    location.reload();
}


function EditExpense(index){
    localStorage.setItem("expenseToEditIndex", index);
    localStorage.setItem("editMode", "true");

    window.location.href = "Add.html";
}