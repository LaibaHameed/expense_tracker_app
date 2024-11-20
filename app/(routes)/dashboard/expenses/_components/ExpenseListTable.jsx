'use client';

import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ExpenseListTable = ({ params, refreshData }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params?.expensesList) {
            setIsLoading(false);
        }
    }, [params]);

    const DeleteExpense = async (expense) => {
        setIsLoading(true); 
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            refreshData();
            toast('Expense Deleted!');
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="mt-3 text-zinc-300 w-full">
                <div className="grid grid-cols-4 p-4 bg-zinc-900 rounded-md my-5 animate-pulse">
                    <div className="h-6 bg-zinc-800 rounded w-20"></div>
                    <div className="h-6 bg-zinc-800 rounded w-20"></div>
                    <div className="h-6 bg-zinc-800 rounded w-20"></div>
                    <div className="h-6 bg-zinc-800 rounded w-10"></div>
                </div>
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="grid grid-cols-4 p-4 animate-pulse">
                        <div className="h-6 bg-zinc-800 rounded w-32"></div>
                        <div className="h-6 bg-zinc-800 rounded w-20"></div>
                        <div className="h-6 bg-zinc-800 rounded w-28"></div>
                        <div className="h-6 bg-zinc-800 rounded w-10"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="mt-3 text-zinc-300 w-full">
            <div className="grid grid-cols-4 p-4 bg-zinc-900 rounded-md my-5">
                <h4 className="font-bold">Name</h4>
                <h4 className="font-bold">Amount</h4>
                <h4 className="font-bold">Date</h4>
                <h4 className="font-bold">Action</h4>
            </div>

            {params?.expensesList?.length > 0 ? (
                params.expensesList.map((expense, i) => (
                    <div key={i} className="grid grid-cols-4 p-4">
                        <p>{expense.name}</p>
                        <p>{expense.amount}</p>
                        <p>{expense.createdBy}</p>
                        <p>
                            <Trash
                                className="text-red-700 cursor-pointer"
                                onClick={() => DeleteExpense(expense)}
                            />
                        </p>
                    </div>
                ))
            ) : (
                <div className="text-zinc-400">No expenses yet!</div>
            )}
        </div>
    );
};

export default ExpenseListTable;
