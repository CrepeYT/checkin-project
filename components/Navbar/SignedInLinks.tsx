'use client'
import React from 'react'
import { SignInButton } from '@clerk/nextjs'
import { toast } from 'sonner'
const SignedInLinks = () => {

const handleLogin =()=>{
  toast("กำลังเข้าสูบระบบแล้วสุดหล่อ")
}

  return (
    <SignInButton>
      <button onClick={handleLogin}>Login</button>
        </SignInButton>
  )
}

export default SignedInLinks