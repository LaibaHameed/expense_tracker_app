### Project Structure

expense_tracker_app/
|
|--- public/
|         |--- (Static files like images, icons, etc.)
|
|--- components/
|         |--- ui/
|               |--- button.jsx
|               |--- sonner.jsx
|
|--- app/
|     |--- layout.jsx (Main layout of the app)
|     |--- page.jsx (Home page)
|     |--- global.css (Global styles)
|     |
|     |--- (auth)/
|     |      |--- sign-in/
|     |              |--- [[...sign-in]]/page.jsx
|     |      |--- sign-up/
|     |              |--- [[...sign-up]]/page.jsx
|     |
|     |--- (routes)/
|     |        |--- dashboard/
|     |             |--- layout.jsx
|     |             |--- page.jsx
|     |             |--- _components/
|     |             |        |--- CardInfo.jsx
|     |             |        |--- DashBoardChart.jsx
|     |             |        |--- DashBoardExpenseList.jsx
|     |             |        |--- SideNav.jsx
|     |             |
|     |             |--- budgets/
|     |             |        |--- page.jsx
|     |             |        |--- _components/
|     |             |              |--- CreateBudget.jsx
|     |             |              |--- BudgetItem.jsx
|     |             |              |--- BudgetList.jsx
|     |             |
|     |             |--- expenses/
|     |             |        |--- page.jsx
|     |             |        |--- [id]/
|     |             |             |--- page.jsx
|     |             |        |--- _components/
|     |             |              |--- AddExpense.jsx
|     |             |              |--- EditBudget.jsx
|     |             |              |--- ExpenseList.jsx
|     |             |
|     |             |--- upgrade/
|     |                     |--- page.jsx
|     |
|     |--- components/
|     |         |--- Header.jsx
|     |         |--- Hero.jsx
|     |
|     |--- fonts/
|
|--- lib/
|     |--- utils.js
|
|--- utils/
|     |--- dbConfig.js (Database configuration)
|     |--- schema.js (Database schema)
|
|--- drizzle/
|         |--- (Drizzle ORM-related files)
|
|--- drizzle.config.jsx (Drizzle configuration file)
|--- jsconfig.jsx (JavaScript configuration file)
|--- middleware.js (Middleware for handling requests)