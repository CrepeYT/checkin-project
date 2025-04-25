import Link from 'next/link'
import React from 'react'
import SignedInLinks from './SignedInLinks'
import { SignedIn,SignedOut } from '@clerk/nextjs'
import Logo from './Logo'

const Navbar = () => {
    return (
        <nav>
            <div className='flex justify-between p-4 '>
                {/* LOGO ใส่ตรงนี้*/}
                <Logo/>

                <div className='flex gap-20 border-b-2 border-purple-600 pb-2 text-purple-600 text-8'>
                    <SignedIn>
                    <Link href={'/dashboard'}>Home</Link>
                    <Link href={'/about'}>About Us</Link>
                    <Link href={'/contact'}>Contact</Link>
                    </SignedIn>
                    <SignedOut>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/about'}>About Us</Link>
                    <Link href={'/contact'}>Contact</Link>
                    <SignedInLinks/>
                    </SignedOut>
                       
                </div>
            </div>
        </nav>
    )
}

export default Navbar