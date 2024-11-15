'use client'
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { Moon, MoonIcon, MoonStar, Sun } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

const Header = () => {
    // const savedMode = typeof window !== 'undefined' ? localStorage.getItem('darkMode') : 'false';
    // const [darkMode, setDarkMode] = useState(savedMode === 'true');
    // let LightMode = <Sun/>
    // let DarkMode = <Moon/>


    // useEffect(() => {
    //     document.documentElement.classList.toggle("dark", darkMode);
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('darkMode', darkMode.toString());
    //     }
    // }, [darkMode]);

    const { user, isSignedIn } = useUser();

    return (
        <div className='p-5 flex justify-between items-center border-gray-600 shadow-md sticky bg-gray-900 text-white'>
            <Image height={100} width={160} src={'./logo.svg'} alt='logo' />
            <div className='flex justify-between items-center'>
                {/* <Button onClick={() => setDarkMode(!darkMode)} className='mx-2 px-3 py-2 rounded-full'>
                {darkMode ? LightMode : DarkMode}
                </Button> */}
                {isSignedIn ? <UserButton/>
                :<Button className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md">
                    <Link href={'/sign-in'}> Get Started </Link>
                </Button> 
                }

            </div>
        </div>
    );
}

export default Header;
