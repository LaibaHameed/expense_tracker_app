import React from 'react';

const DashBoardExpenseList = ({ expensesList, refreshData }) => {
    return (
        <div>
            <h4 className="font-bold text-xl mb-4">Expense List</h4>
            {expensesList.length > 0 ? (
                <div className="space-y-3">
                    {expensesList.map((expense) => (
                        <div key={expense.id} className="grid grid-cols-3 p-4 bg-zinc-900 text-zinc-300 rounded-md">
                            <p>{expense.name}</p>
                            <p>{expense.amount}</p>
                            <p>{expense.createdBy}</p>
                        </div>
                    ))}
                </div>

            ) : (
                <div className="text-zinc-400">No expenses yet!</div>
            )}
        </div>
    );
};

export default DashBoardExpenseList;
