'use client';

import React, { use, useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense'

const ExpensesComp = ({ params }) => {
  const { isLoaded, user } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [budgetInfo, setBudgetInfo] = useState(null);

  // Unwrap params using `use`
  const unwrappedParams = use(params); // Unwrap params to access id
  const { id } = unwrappedParams;

  // Fetch user email
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (isLoaded && user) {
        const email = user?.primaryEmailAddress?.emailAddress || 'Email not available';
        setUserEmail(email);
      }
    };
    fetchUserEmail();
  }, [isLoaded, user]);

  // Fetch budget info
  const getBudgetInfo = async () => {
    if (!userEmail || !id) return;
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, userEmail))
        .where(eq(Budgets.id, id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0] || null); // Assuming result is an array
      console.log(result);
    } catch (error) {
      console.error('Error fetching getBudgetInfo:', error);
    }
  };

  useEffect(() => {
    if (userEmail && id) {
      getBudgetInfo();
    }
  }, [userEmail, id]); // Dependencies updated to trigger when userEmail or id changes

  const getExpensesList = ()=> {
    
  }

  return (
    <div className="p-10">
      <h1 className="text-zinc-300">My Expenses</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-5'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          // Loading placeholder
          <div className='h-[150px] w-full rounded-lg animate-pulse'>
          </div>
        )}

        <AddExpense budgetId={id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
};

export default ExpensesComp;
