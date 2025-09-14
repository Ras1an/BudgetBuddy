# Budget Buddy

A simple and intuitive web-based expense tracker that helps you manage your personal finances by tracking income, expenses, and maintaining a budget balance.

🔗 [Live Demo](https://ras1an.github.io/BudgetBuddy/)  
🎥 [Video Demo](https://drive.google.com/file/d/109ibTxPUvqVvRn_u5ch4XG7E5o1982Tb/view?usp=sharing)


## Features

- **Income & Balance Management**: Set your income and automatically calculate your remaining balance
- **Expense Tracking**: Add, edit, and delete expenses with categorization
- **Category Organization**: Pre-defined categories including Food & Groceries, Rent, Transportation, Entertainment, and more
- **Time-based Filtering**: View expenses for Today, This Month, or All time
- **Data Visualization**: Interactive bar charts showing expense distribution by category
- **Local Storage**: All data is stored locally in your browser for privacy and offline access

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ras1an/BudgetBuddy.git
```

2. Navigate to the project directory:
```bash
cd BudgetBuddy
```

3. Open `index.html` in your web browser or serve it using a local web server.

## Usage

### Setting Up Your Income
1. Click on the "Income" box on the main dashboard
2. Enter your total income when prompted
3. Your balance will be automatically calculated

### Adding Expenses
1. Click "Add New Expense" button
2. Fill in the expense details:
   - Expense Name
   - Select Category from dropdown
   - Enter Amount
3. Click "Save" to add the expense

### Managing Expenses
- **View**: Use the dropdown filter to view expenses by time period (All, Today, Month)
- **Edit**: Click the "Edit" button next to any expense to modify it
- **Delete**: Click the "Delete" button to remove an expense

### Visualizing Data
- Click "See Visualization" to view a bar chart of your expenses by category
- Use the time filter to see visualizations for different periods

## File Structure

```
budget-buddy/
├── index.html              # Main dashboard page
├── Index.css              # Styles for main dashboard
├── Index.js               # Main dashboard functionality
├── Add.html               # Add/Edit expense page
├── Add.css                # Styles for add expense form
├── Add.js                 # Add/Edit expense functionality
├── visualization.html     # Data visualization page
├── visualization.js       # Chart rendering logic
└── images/
    └── icon.png          # Application icon
```

## Categories

The application includes the following predefined expense categories:
- Food & Groceries
- Rent
- Home
- Family
- Health & Medical
- Transportation
- Education
- Personal
- Car
- Entertainment
- Others

## Data Storage

All data is stored locally in your browser's localStorage, including:
- Income amount
- Current balance
- Total expenses
- Individual expense records

**Note**: Clearing your browser data will remove all stored information.

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Application logic and interactivity
- **Chart.js**: Data visualization
- **Local Storage API**: Data persistence

---

**Budget Buddy** - Take control of your finances, one expense at a time! 💰



