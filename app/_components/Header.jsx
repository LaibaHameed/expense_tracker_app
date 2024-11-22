'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.add('dark');
    }

    const { user, isSignedIn } = useUser();

    return (
        <div className="p-5 flex justify-between items-center dark-glow border-bottom shadow-md sticky bg-zinc-950 text-white">
            <Image height={100} width={160} src={'./logo.svg'} alt="logo" />
            <div className="flex justify-between items-center">
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <button
                        className="group relative inline-flex items-center overflow-hidden rounded bg-blue-500 md:px-8 md:py-3 py-1 px-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                        href="#"
                    >
                        <span className="absolute -end-full transition-all group-hover:end-4">
                            <svg
                                className="size-5 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:me-4"> <Link href={'/sign-in'}> Get Started </Link> </span>
                    </button>

                )}
            </div>
        </div>
    );
};

export default Header;
