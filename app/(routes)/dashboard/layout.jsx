'use client'
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { X, Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }) => {
    const user = useUser();
    const router = useRouter();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false); // sidebar toggle
    const [hasBudgets, setHasBudgets] = useState(null); // store the budgets check result

    const checkUserBudgets = async () => {
        const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
        setHasBudgets(result.length > 0); 
    }

    useEffect(() => {
        if (user) {
            checkUserBudgets();
        }
    }, [user]);

    useEffect(() => {
        if (hasBudgets === false) {
            router.replace('/dashboard/budgets');
        }
    }, [hasBudgets, router]);

    return (
        <div className="relative">
            {/* Side Navigation for larger screens */}
            <div className={`fixed md:w-64 hidden md:block text-white`}>
                <SideNav setIsSideNavOpen={setIsSideNavOpen} /> 
            </div>

            {/* Side Navigation for small screens */}
            <div className={`md:hidden ${isSideNavOpen ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 z-50`}>
                <div className="absolute top-0 left-0 w-64 bg-black p-4">
                    <SideNav setIsSideNavOpen={setIsSideNavOpen} />
                    <button
                        className="absolute top-2 right-2 text-white"
                        onClick={() => setIsSideNavOpen(false)}
                        type="button"
                    >
                        <X className="text-zinc-300" />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className={`md:ml-64 ${isSideNavOpen ? 'ml-0' : ''}`}>
                <div className="p-5 dark-glow border-bottom border-zinc-900 flex items-center justify-end relative">
                    <div className="flex items-center">
                        <UserButton />
                    </div>
                    {/* Mobile menu button for small screens */}
                    <div className="md:hidden absolute top-5 left-5 z-10">
                        <button
                            className="text-white p-2"
                            onClick={() => setIsSideNavOpen(!isSideNavOpen)} 
                        >
                            {isSideNavOpen ? 'Close' : <Menu className="text-zinc-300" />} 
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
