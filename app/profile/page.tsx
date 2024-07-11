import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { LayoutProfile } from '@/components/Profile/LayoutProfile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile Page | Muscle First Dashboard',
  description: 'Profile page for Muscle First Dashboard'
  // other metadata
}

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName='Profile' />

      <LayoutProfile />
    </>
  )
}

export default Profile
