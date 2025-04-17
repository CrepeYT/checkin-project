import { UserButton } from '@clerk/nextjs'
import React from 'react'

const UserInfo = () => {
  return (
    <div>
         <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">
      <UserButton showName/>
      </h2>
      <div className="mt-2">
<UserButton>
    <UserButton.MenuItems />
</UserButton>
      </div>
    </div>
    </div>
  )
}

export default UserInfo