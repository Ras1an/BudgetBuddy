let chartInstance = null;



let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
document.addEventListener("DOMContentLoaded", event => {
    const expenseInterval = document.getElementById("expenseInterval");

    let interval = localStorage.getItem("selectedInterval") || "All";
    expenseInterval.value = interval;
    let {first, last} = getExpenses(interval);
    console.log(first, last);

    let expencesToDraw = SumEachCategory(first, last);

    
    draw(expencesToDraw);
    expenseInterval.addEventListener("change", function(){
        interval = expenseInterval.value;
        localStorage.setItem("selectedInterval", interval);
        const {first, last} = getExpenses(interval);
        expencesToDraw = SumEachCategory(first, last);
        
      draw(expencesToDraw);
    });


}
);

class Category{
    constructor(category, amount){
        this.category = category;
        this.amount = amount;
    }
}


function SumEachCategory(start, end){

      const categoryTotals = {};

      for(let i = start; i <= end ; ++i){
        const {category, amount} = expenses[i];

        if(categoryTotals[category])
            categoryTotals[category] += Number(amount);
        else
            categoryTotals[category] = Number(amount);
      }
      console.log(categoryTotals);
      return categoryTotals;
}



function draw(categoryTotals){
    //const cateogries = ["Food & Groceries", "Rent", "Home", "Family", "Health & Medical", "Transportation", "Education", "Personal", "Car", "Entertainment", "Others"];
  // const categoryTotals = SumEachCategory();

  if(!categoryTotals){
    
  }
  const ctx = document.getElementById('expensesChart').getContext('2d');

  if (chartInstance) {
        chartInstance.destroy();
    }

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: 'Expenses',
      data: Object.values(categoryTotals),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(3, 240, 42, 0.6)',
        'rgba(77, 64, 101, 0.6)',
        'rgba(21, 46, 55, 0.47)',
        'rgba(243, 176, 8, 0.6)',
        'rgba(249, 15, 241, 0.6)',
        'rgba(241, 0, 104, 0.6)',
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      legend: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Expenses Distribution'
        }
      }
    },
  };

  chartInstance = new Chart(ctx, config);
}



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