import React from 'react'
import BudgetList from './_components/BudgetList'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const Budgets = () => {
  return (
    <div className='p-10'>
      <h1 className='text-zinc-300 flex items-center '> <Link href={'/dashboard'} className='p-1 mx-1 hover:bg-zinc-800 rounded-full'> <ArrowLeft className='text-zinc-300' /> </Link> My Budgets</h1>
      <BudgetList/>
    </div>
  )
}

export default Budgets