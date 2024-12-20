'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const Hero = () => {
    const { user, isSignedIn } = useUser();
    return (
        <section className="bg-zinc-950 text-white flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Track Spending.

                        <span className="sm:block">  Optimize Budgets. </span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Effortlessly manage your finances and stay in control of every expense.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {isSignedIn ?
                            <Link
                                className="block w-auto rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href={'/dashboard'}
                            >
                                See DashBoard
                            </Link>
                            : <Link
                                className="block w-auto rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href={'/sign-in'}
                            >
                                Get Started
                            </Link>
                        }
                    </div>
                </div>
            </div>
            <Image height={700} width={700} src={'/home.png'} alt='logo' className='-mt-9 rounded-xl border-2' />
        </section>
    )
}

export default Hero