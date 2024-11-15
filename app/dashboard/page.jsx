import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const page = () => {
  return (
    <div>
        <UserButton/>
    </div>
  )
}

export default page