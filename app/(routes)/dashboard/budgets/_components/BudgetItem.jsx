import React from 'react'

const BudgetItem = ({ budget }) => {
    return (
        // hover:border-zinc-400 border-gray-700
        <div className='rounded-md p-5 mt-7 cursor-pointer bg-zinc-900 text-zinc-300 shadow-sm hover:shadow-zinc-400'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-black rounded-lg'>
                        <h2 className='text-xl p-2'>{budget.icon}</h2>
                    </div>

                    <div>
                        <p className='font-semibold text-zinc-200'>{budget.name}</p>
                        <p className='numeric text-xs'>{budget.totalItem} Item</p>
                    </div>

                </div>
                <h4 className='font-bold'>${budget.amount}</h4>
            </div>

            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-xs text-zinc-300'>Spend: ${budget.totalSpend ? budget.totalSpend : 0}</h4>
                    <h4 className='text-xs text-zinc-300'>Remaining: ${budget.amount - budget.totalSpend}</h4>
                </div>
                <div className='w-full h-2 rounded-full bg-zinc-400'>
                    <div className='w-[40%] bg-blue-600 rounded-full h-2'></div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem