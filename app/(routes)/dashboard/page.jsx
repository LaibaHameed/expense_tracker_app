'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import DashBoardBarChart from './_components/DashBoardBarChart';
import BudgetItem from './budgets/_components/BudgetItem';
import DashBoardExpenseList from './_components/DashBoardExpenseList';

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loadingBudgets, setLoadingBudgets] = useState(true); 
  const [loadingExpenses, setLoadingExpenses] = useState(true); 

  // Fetch user email on load
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (isLoaded && user) {
        const email = user?.primaryEmailAddress?.emailAddress || "Email not available";
        setUserEmail(email);
      }
    };
    fetchUserEmail();
  }, [isLoaded, user]);

  // Fetch budgets
  const getBudgetList = async () => {
    if (!userEmail) return;

    try {
      setLoadingBudgets(true); // Start loading
      const budgetResult = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, userEmail))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(budgetResult);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setLoadingBudgets(false); // Stop loading
    }
  };

  // Fetch expenses
  const getExpensesList = async () => {
    if (!userEmail) return;

    try {
      setLoadingExpenses(true); // Start loading
      const expenseResult = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdBy: Expenses.createdBy,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, userEmail))
        .orderBy(desc(Expenses.id));

      setExpensesList(expenseResult);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoadingExpenses(false); // Stop loading
    }
  };

  // Fetch data on userEmail update
  useEffect(() => {
    if (userEmail) {
      getBudgetList();
      getExpensesList();
    }
  }, [userEmail]);

  return (
    <div className="p-8 text-zinc-300">
      {isLoaded && user && <h1 className="text-3xl">Hi, {user.fullName} 👋 </h1>}
      <p className="text-zinc-400 py-4">
        Here's what's happening with your money. Let's manage your expenses!
      </p>
      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <DashBoardBarChart budgetList={budgetList} />
          {loadingExpenses ? (
            <div className="h-[300px] bg-zinc-800 animate-pulse rounded-md" />
          ) : (
            <DashBoardExpenseList expensesList={expensesList}
            refreshData={() => {
              getExpensesList();
              getBudgetList();
            }} />
          )}
        </div>
        <div className="gap-5">
          <h4 className="font-bold text-lg my-3">Latest Budgets</h4>
          {loadingBudgets ? (
            [1, 2, 3].map((_, i) => (
              <div key={i} className="bg-zinc-800 animate-pulse h-24 rounded-md mb-3" />
            ))
          ) : budgetList.length > 0 ? (
            budgetList.map((budget, i) => <BudgetItem budget={budget} key={i} />)
          ) : (
            <div className="text-zinc-400">No budgets yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
