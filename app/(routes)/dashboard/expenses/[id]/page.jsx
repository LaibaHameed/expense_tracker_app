'use client';

import React, { use, useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const { isLoaded, user } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const route = useRouter();

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
      getExpensesList();
    } catch (error) {
      console.error('Error fetching getBudgetInfo:', error);
    }
  };

  const getExpensesList = async () => {
    const result = await db.select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id))

    setExpensesList(result);
    console.log(result);
  }

  const deleteBudget = async () => {
    const deleteExpenses = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, id))
      .returning()

    if (deleteExpenses) {
      const result = await db.delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning();
      console.log(result);
    }

    toast('Budget Deleted !')
    route.refresh('dashboard/budgets')

  }

  useEffect(() => {
    if (userEmail && id) {
      getBudgetInfo();
    }
  }, [userEmail, id]); // Dependencies updated to trigger when userEmail or id changes

  return (
    <div className="p-10">
      <h1 className="text-zinc-300 flex justify-between">My Expenses
        <Button className='flex gap-2 bg-red-700 shadow-sm hover:shadow-zinc-400' onClick={() => setIsDialogOpen(true)} > <Trash /> Delete </Button>
      </h1>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col justify-center  text-zinc-300 bg-zinc-900 rounded-lg p-10 h-[200px] lg:w-1/3 shadow-lg border-1 border-zinc-400">
            <p className="text-xl mb-3">Are You sure you want to delete Budget?</p>
            <p className="text-sm font-thinr mb-3 text-zinc-400">This will be delete your Budget permanently along with tasks!</p>
            <div className="flex justify-end space-x-4 mt-5">
              <Button
                onClick={() => setIsDialogOpen(false)}
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded hover:text-zinc-200 hover:bg-slate-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-700 text-zinc-200 px-4 py-2 rounded hover:bg-red-500"
                onClick={() => {
                  deleteBudget()
                  setIsDialogOpen(false)
                }
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3 xl:gap-5'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          // Loading placeholder
          <div className='h-[150px] w-full rounded-lg animate-pulse'>
          </div>
        )}
        <AddExpense budgetId={id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
      <div className='mt-10'>
        <h2 className='text-zinc-300'>Latest Expenses</h2>
        <ExpenseListTable params={{ expensesList: expensesList }} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
};

export default Page;
