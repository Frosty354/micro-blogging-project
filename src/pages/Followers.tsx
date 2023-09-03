import MainLayout from '@/Components/layouts/MainLayout';
import React from 'react'
Followers.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;
export default function Followers() {
  return (
    <div>Followers</div>
  )
}
