import Link from 'next/link';
import React from 'react';

const BudgetItem = ({ budget }) => {
    // Function to calculate the progress bar percentage
    const calProgressBar = () => {
        const amount = budget?.amount || 0;
        const totalSpend = budget?.totalSpend || 0;

        if (amount === 0) return 0;  

        const percentage = (totalSpend / amount) * 100;
        return percentage > 100 ? 100 : percentage.toFixed(2); 
    };

    if (!budget) return null; 

    // Calculate remaining balance
    const remainingBalance = (budget?.amount || 0) - (budget?.totalSpend || 0);
    const isOverBudget = remainingBalance < 0;
    const overspendAmount = isOverBudget ? Math.abs(remainingBalance) : 0;

    return (
        <Link href={'/dashboard/expenses/' + budget?.id} >
            <div className='rounded-md p-5 mt-7 cursor-pointer bg-zinc-900 text-zinc-300 shadow-sm hover:shadow-zinc-400'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-black rounded-lg'>
                            <h2 className='text-xl p-2'>{budget?.icon}</h2>
                        </div>

                        <div>
                            <p className='font-semibold text-zinc-200'>{budget?.name}</p>
                            <p className='numeric text-xs'>{budget?.totalItem} Item</p>
                        </div>
                    </div>
                    <h4 className='font-bold'>${budget?.amount}</h4>
                </div>

                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        <h4 className='text-zinc-300 text-sm'>
                            Spend: <span className={`text-xs ${isOverBudget ? 'text-red-500' : 'text-zinc-300'}`}>  ${budget?.totalSpend ? budget?.totalSpend : 0} </span>
                        </h4>
                        <h4 className='text-zinc-300 text-sm'>
                            {isOverBudget ? (
                                <>
                                    Overspend: <span className="text-xs text-red-500">${overspendAmount}</span>
                                </>
                            ) : (
                                <>
                                    Remaining: <span className={`text-xs ${isOverBudget ? 'text-red-500' : 'text-zinc-300'}`}> ${remainingBalance < 0 ? 0 : remainingBalance} </span>
                                </>
                            )}
                        </h4>
                    </div>
                    <div className='w-full h-2 rounded-full bg-zinc-400'>
                        <div className={`h-2 rounded-full ${isOverBudget ? 'bg-red-600' : 'bg-blue-600'}`} style={{
                            width: `${calProgressBar()}%`
                        }}></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BudgetItem;
