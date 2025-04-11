import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='flex justify-between p-4 '>
                {/* LOGO */}
                <Link href={'/'}>LOGO</Link>

                <div className='flex gap-20 border-b-2 border-purple-600 pb-2 text-purple-600 text-xl'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/about'}>About Us</Link>
                    <Link href={'/contact'}>Contact</Link>
                    <Link href={'/login'}>Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar