import React from 'react'
import BudgetList from './_components/BudgetList'

const Budgets = () => {
  return (
    <div className='p-10'>
      <h1 className='text-zinc-300'>My Budgets</h1>
      <BudgetList/>
    </div>
  )
}

export default Budgets