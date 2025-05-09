import { auth, currentUser } from '@clerk/nextjs/server'

// อันนี้คือชื่อของเราที่ Login ด้วย อีเมล์ดึงข้อมูลมาจาก clerk

export default async function GetUserID() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId} = await auth()

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  // Use `user` to render user details or create UI elements
  return <div>{user?.id}</div>
}
