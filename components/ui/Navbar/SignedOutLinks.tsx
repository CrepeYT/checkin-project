'use client'
import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { toast } from "sonner"

const SignedOutLinks = () => {

const handleLogout =()=>{
    toast("ออกจากระบบเรียบร้อยแล้วสุดหล่อ")

}

  return (
    <SignOutButton>
        <button onClick={handleLogout}>Logout</button>
        </SignOutButton>
  )
}

export default SignedOutLinks