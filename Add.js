
let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

let balance = Number(localStorage.getItem("balance"));
let income = Number(localStorage.getItem("income"));
let expense = Number(localStorage.getItem("expense"));


let name, categories, amount;


document.addEventListener("DOMContentLoaded", event =>{

        name = document.getElementById("name");
        categories = document.getElementById("categories");
        amount = document.getElementById("amount");
        LoadCategories();
        
       const addBtn = document.getElementById("addExpense");
       const isEditMode = localStorage.getItem("editMode") === "true";
       if(isEditMode){
          localStorage.removeItem("editMode");
          let expenseIndex = Number(localStorage.getItem("expenseToEditIndex"));
          localStorage.removeItem("expenseToEditIndex");
          loadExpense(expenseIndex);
          addBtn.onclick = () => EditExpense(expenseIndex);
       } 

      else{
       addBtn.onclick = addExpense;
       }
});

function loadExpense(expenseIndex){
        name.value = expenses[expenseIndex].name;
        categories.value = expenses[expenseIndex].category;
        amount.value = expenses[expenseIndex].amount;
}


function ValidateExpense(){
      let expenseName = name.value;
      let category = categories.value;
      let amountValue = amount.value;
      
      if(category == "Select Category" || amountValue == "" || expenseName == ""){
        MakeMessage("Please fill all the data required!", "red");
        return false;
      }
      else{
        amountValue = Number(amountValue);
        if(amountValue < 0){
          MakeMessage("Amount Can not be Negative!", "red");
          return false;
        }
        if(amountValue > balance){
  
        MakeMessage("❌ Expense can not be greater than balance!", "red");
        return false;
      }
        }
      }
      return true;     
}
function EditExpense(expenseIndex){
        event.preventDefault();
        const validExpense = ValidateExpense();
        if(validExpense){
        const oldAmount = Number(expenses[expenseIndex].amount);


       
        expenses[expenseIndex].name = name.value;
        expenses[expenseIndex].cateogry = categories.value;
        expenses[expenseIndex].amount = amount.value;
        const newAmount = Number(expenses[expenseIndex].amount);
        localStorage.setItem("expenses", JSON.stringify(expenses));


       balance += oldAmount;
       balance -= newAmount;
       localStorage.setItem("balance", balance);

       expense -= oldAmount;
       expense += newAmount;
       localStorage.setItem("expense", expense);
      
        MakeMessage("✅ Expense Edited successfully!", "green");
        }
}

function LoadCategories(){
  const categoriesElement =  document.getElementById("categories");
      const cateogries = ["Food & Groceries", "Rent", "Home", "Family", "Health & Medical", "Transportation", "Education", "Personal", "Car", "Entertainment", "Others"];
       cateogries.forEach(cateogry => {
         let option = document.createElement("option");
         option.textContent = cateogry;
         categoriesElement.appendChild(option);
       }); 
}


function MakeMessage(messageText, messageColor){
         const message = document.getElementById("message");
         message.classList = "";
  
          message.classList.add("visible");
          message.classList.add(`${messageColor}Message`);
          message.textContent = messageText;

          setTimeout(() => {
          message.classList.remove("visible");
          message.classList.add("hidden");
         }, 2000)
      
}
function addExpense(){
      event.preventDefault();
      const validExpense = ValidateExpense();

      if(validExpense){
      let date = Date();
      let newExpense = {
        name: name.value,
        category: categories.value,
        amount: amount.value,
        date: date
      };
      
      let amountValue = Number(amount.value);

      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      balance -= amountValue;
      localStorage.setItem("balance", balance);

      expense += amountValue;
      localStorage.setItem("expense", expense);


      MakeMessage("✅ Expense added successfully!", "green");
      name.value = "";
      categories.value = "Select Category";
      amount.value = "";
    }
}

