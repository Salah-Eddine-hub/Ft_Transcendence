'use client'
import Link from 'next/link'
// import FriendsAndGroups from '../../components/chatComponents/FriendsAndGroups'
// import { RightSection } from '../../components/chatComponents/rightSection'
import type { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { useEffect } from 'react'



export default function Chat() {

  const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  

  return (
    <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> </main>
  )
}
