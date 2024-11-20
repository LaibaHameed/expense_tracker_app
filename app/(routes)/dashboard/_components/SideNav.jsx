'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutDashboard, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SideNav = ({ setIsSideNavOpen }) => {
    const menuList = [
        {
            id: 1,
            name: "DashBoard",
            icon: <LayoutDashboard />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Budgets",
            icon: <PiggyBank />,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: "Expenses",
            icon: <ReceiptText />,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: "Upgrade",
            icon: <ShieldCheck />,
            path: '/dashboard/upgrade'
        },
    ]
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [])
    return (
        <div className='min-h-screen p-5 dark-glow border border-zinc-900 flex flex-col justify-between'>
            <div>
            <Link href={'/'}><Image height={100} width={160} src={'./logo.svg'} alt='logo' /></Link>
            <div className='pt-10'>
                {menuList.map((menuItem, index) => (
                    <Link href={menuItem.path} key={index} onClick={() => setIsSideNavOpen(false)} >
                        <h4 className={`flex gap-2 items-center text-center text-zinc-300 p-5 mb-2 cursor-pointer hover:text-blue-500 hover:bg-zinc-900 rounded-md ${path == menuItem.path && 'text-blue-600 bg-zinc-900 '}`}>
                            {menuItem.icon}
                            {menuItem.name}
                        </h4>
                    </Link>
                ))}

            </div>
            </div>
            <div className='bottom-5 flex gap-2 p-5 items-start text-zinc-400 text-lg font-medium font-mono '>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav