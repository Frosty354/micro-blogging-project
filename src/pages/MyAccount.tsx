import MainLayout from '@/Components/layouts/MainLayout';
import React from 'react'


MyAccount.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;


export default function MyAccount() {
  return (
    <div>MyAccount</div>
  )
}

