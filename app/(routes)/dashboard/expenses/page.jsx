'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ExpenseList = () => {
    const { isLoaded, user } = useUser();
    const [userEmail, setUserEmail] = useState(null);
    const [expensesList, setExpensesList] = useState([]);
    const [loadingExpenses, setLoadingExpenses] = useState(true);

    // Fetch user email on load
    useEffect(() => {
        const fetchUserEmail = async () => {
            if (isLoaded && user) {
                const email = user?.primaryEmailAddress?.emailAddress || 'Email not available';
                setUserEmail(email);
            }
        };
        fetchUserEmail();
    }, [isLoaded, user]);

    // Fetch expenses
    const getExpensesList = async () => {
        if (!userEmail) return;

        try {
            setLoadingExpenses(true); 
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
            console.error('Error fetching expenses:', error);
        } finally {
            setLoadingExpenses(false); 
        }
    };

    // Handle deleting an expense
    const deleteExpense = async (expense) => {
        try {
            await db.delete(Expenses).where(eq(Expenses.id, expense.id));
            setExpensesList((prevExpenses) =>
                prevExpenses.filter((item) => item.id !== expense.id)
            );
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Fetch data on userEmail update
    useEffect(() => {
        if (userEmail) {
            getExpensesList();
        }
    }, [userEmail]);

    return (
        <div className="md:p-10 py-10">
            <h1 className='text-zinc-300 flex items-center mb-5'> <Link href={'/dashboard'} className='p-1 mx-1 hover:bg-zinc-800 rounded-full'> <ArrowLeft className='text-zinc-300' /> </Link> My Expenses</h1>
            <div className="text-zinc-300 w-full">
                <div className="grid grid-cols-4 sm:grid-cols-4 p-4 bg-zinc-900 rounded-md my-5">
                    <h4 className="font-bold">Name</h4>
                    <h4 className="font-bold">Amount</h4>
                    <h4 className="font-bold">Date</h4>
                    <h4 className="font-bold flex items-center justify-center">Delete</h4>
                </div>

                {loadingExpenses ? (
                    // Skeleton Loader
                    <div className="grid grid-cols-4 p-3 bg-zinc-800 animate-pulse">
                        <div className="h-5 bg-zinc-700 rounded-md col-span-1"></div>
                        <div className="h-5 bg-zinc-700 rounded-md col-span-1"></div>
                        <div className="h-5 bg-zinc-700 rounded-md col-span-1.5"></div>
                        <div className="h-5 bg-zinc-700 rounded-md col-span-0.5"></div>
                    </div>
                ) : expensesList.length > 0 ? (
                    expensesList.map((expense, i) => (
                        <div key={i} className="grid grid-cols-4 sm:grid-cols-4 p-3">
                            <p className="sm:text-xs lg:text-sm">{expense.name}</p>
                            <p className="sm:text-xs lg:text-sm">{expense.amount}</p>
                            <p className="sm:text-xs lg:text-sm">{expense.createdBy}</p>
                            <p className="flex items-center justify-center sm:text-xs lg:text-sm">
                                <Trash
                                    className="text-red-700 cursor-pointer"
                                    onClick={() => deleteExpense(expense)}
                                />
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-zinc-400">No expenses yet!</div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
