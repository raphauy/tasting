import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {

  const currentUser= await getCurrentUser()
  if (!currentUser) 
    redirect('/login')

  if (currentUser.role === 'admin') {
    redirect('/admin')
  }
  return (
    <div className='flex flex-col items-center gap-10 mt-10'>
      <h1 className='text-2xl font-bold'>Page</h1>

      <Link href="/login"><Button>Login</Button></Link>
    </div>
  )
}
