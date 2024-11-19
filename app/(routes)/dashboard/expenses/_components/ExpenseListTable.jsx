'use client';

import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const ExpenseListTable = ({ params, refreshData }) => {
    if (!params || !params.expensesList) {
        return <div className='text-zinc-400'>No expenses available</div>;
    }
    const { expensesList } = params;

    const DeleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            refreshData()
            toast('Expense Deleted! ')
        }
    }
    return (
        <div className="mt-3 text-zinc-300 w-full">
            <div className="grid grid-cols-4 p-4 bg-zinc-900 rounded-md my-5">
                <h4 className='font-bold' >Name</h4>
                <h4 className='font-bold' >Amount</h4>
                <h4>Date</h4>
                <h4 className='font-bold' >Action</h4>
            </div>
            
            {expensesList?.length > 0 ? (expensesList.map((expense, i) => (
            <div key={i} className="grid grid-cols-4 p-4">
                <p>{expense.name}</p>
                <p>{expense.amount}</p>
                <p>{expense.createdBy}</p>
                <p>
                    <Trash className="text-red-700 cursor-pointer" onClick={() => DeleteExpense(expense)} />
                </p>
            </div>
            ))) :  <div className='text-zinc-400'>No expenses yet !</div>}
        </div>
    );
};


export default ExpenseListTable;
