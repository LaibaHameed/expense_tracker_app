# Expense Tracker App

An intuitive application to manage your expenses and budgets efficiently.

---

## Technologies Used

- **Next.js**: For building the frontend and backend of the application.
- **Drizzle ORM**: To handle database operations and schema management.
- **PostgreSQL**: As the database for storing application data.
- **Neon**: A serverless PostgreSQL platform for hosting the database.
- **Clerk**: For user authentication and management.
- **TailwindCSS**: For styling the application with ease.

---

## Features

- User authentication with Clerk (Sign Up, Sign In).
- Dashboard to view budgets and expenses.
- Create, edit, and delete budgets.
- Add, edit, and delete expenses under specific budgets.
- Visual representation of budgets and expenses through charts.
- Responsive design with TailwindCSS.

---

## Installation Guidelines

### Prerequisites

1. Create accounts for the following:
   - [Neon](https://neon.tech/) (for PostgreSQL hosting).
   - [Drizzle ORM](https://orm.drizzle.team/) (for database operations).
   - [Clerk](https://clerk.dev/) (for authentication).

### Steps

1. **Clone the repository**:  
   - Download the project by cloning the repository to your local machine.  
   - Navigate into the project directory.

2. **Install dependencies**:  
   - Install the required dependencies to run the application.

3. **Set up environment variables**:  
   - Create a `.env` file in the root directory and configure the following variables:  
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your Clerk Publishable Key>`  
     - `CLERK_SECRET_KEY=<Your Clerk Secret Key>`  
     - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=<Your Clerk Sign-In URL>`  
     - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=<Your Clerk Sign-Up URL>`  
     - `NEXT_PUBLIC_DATABASE_URL=<Your Neon Database URL>`

4. **Run the database**:  
   - Push the database schema to Neon using Drizzle ORM.  
   - Open the database studio to inspect and manage the database visually.

5. **Start the server**:  
   - Run the development server to start the application.

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
