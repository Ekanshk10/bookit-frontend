import React from 'react'
import MainDetails from './components/MainDetails'
import { getExperienceById } from '@/app/lib/getExperienceById'

const page = async ({params}) => {
    const {id} = await params

   
  return (
   <>
    <MainDetails id= {id}/>
   </>
  )
}

export default page