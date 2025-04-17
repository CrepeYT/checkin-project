
import DashboardPage from '@/app/(main)/dashboard/page'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'
const BodyInterface = () => {
    return (
        <div>
        <SignedOut>
        <div className="flex flex-col space-y-4 max-w-md p-20 pt-40">
            <h1 className="text-5xl font-bold text-purple-600">Check-in</h1>
            <h2 className="text-2xl text-purple-400">Check in for class</h2>
            <p className="text-purple-300">
                To make the lives of students easier<br />
                when checking in to class.
            </p>
            <SignInButton>
             <button className="bg-purple-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-500 transition">
             Start Check-in
                </button>
            </SignInButton>
        </div>
        </SignedOut>
        <SignedIn>
            <DashboardPage/>
        </SignedIn>
        </div>
    )
}

export default BodyInterface