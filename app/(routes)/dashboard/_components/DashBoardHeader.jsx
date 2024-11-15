import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashBoardHeader = () => {
    return (
        <div className='p-5 dark-glow border-b border-zinc-900 flex justify-between'>
            <div className='text-white'>Search bar</div>
            <div> <UserButton /> </div>
        </div>
    )
}

export default DashBoardHeader