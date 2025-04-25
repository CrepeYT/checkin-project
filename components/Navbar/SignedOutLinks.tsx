'use client'
import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'
import { toast } from "sonner"

const SignedOutLinks = () => {

// const handleLogout =()=>{
//     toast("ออกจากระบบเรียบร้อยแล้วสุดหล่อ")

// }

  return (
    <SignOutButton>
       <LogIn />
        </SignOutButton>
  )
}

export default SignedOutLinks