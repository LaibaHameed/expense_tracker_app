'use client'
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashBoardHeader from './_components/DashBoardHeader'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'

const DashboardLayout = ({ children }) => {
    const user = useUser();
    const router = useRouter()
    const checkUserBudgets = async () => {
        const result  = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        // console.log(result);
        if(result.length == 0){
            router.replace('/dashboard/budgets')
        }
    }
    useEffect(()=>{
        user && checkUserBudgets();
    },[user])
    return (
        <div>
            <div className='fixed md:w-64 hidden md:block text-white'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                <DashBoardHeader/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout