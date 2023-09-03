import MainLayout from '@/Components/layouts/MainLayout';
import React from 'react'
Following.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;
export default function Following() {
  return (
    <div>Following</div>
  )
}
