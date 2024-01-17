import HomePage from '@/components/Dashboard/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Muscle First Dashboard',
  description: 'Home page for Muscle First Dashboard'
}

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  )
}
