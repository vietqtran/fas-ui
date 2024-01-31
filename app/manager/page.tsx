'use client'

import ManagerLayout from '@/components/Common/Layouts/ManagerLayout'
import React from 'react'
import { RootState } from '@/helpers/redux/reducers'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

interface Props {}

const AdminPage = (props: Props) => {
   const { user } = useSelector((state: RootState) => state.user)
   const router = useRouter()
   if (!user || user.role.name !== 'MANAGER') {
      router.push('/login')
   }
   return (
      <ManagerLayout>
         <div>Admin Page</div>
      </ManagerLayout>
   )
}

export default AdminPage
