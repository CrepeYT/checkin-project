import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (

    <div className="flex flex-col space-y-4 max-w-md p-20 pt-40">
    <h1 className="text-5xl font-bold text-purple-600">Check-in</h1>
    <h2 className="text-2xl text-purple-400">Check in for class</h2>
    <p className="text-purple-300">
      To make the lives of students easier<br />
      when checking in to class.
    </p>
    <Link href={'/login'}>
    <Button  className="bg-purple-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-500 transition">
      Start check-in
    </Button>
    </Link>
  </div>
  )
}

export default page