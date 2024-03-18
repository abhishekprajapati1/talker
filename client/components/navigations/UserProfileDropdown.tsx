'use client';
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import Image from 'next/image';
import useFetch from '@/libs/hooks/useFetch';
import endpoints from '@/libs/endpoints';
import api from '@/libs/api';

const UserProfileDropdown = () => {
  const { data, isLoading } = useFetch({ endpoint: endpoints.PROFILE });


  const handleLogout = async () => {
    const response = await api.post(endpoints.LOGOUT);
    console.log(response.data);
  }


  if (isLoading || !data) {
    return (
      <div className='w-[32px] h-[32px] bg-secondary/50 animate-pulse rounded-full' />
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className='w-[32px] h-[32px] p-0 rounded-full overflow-hidden relative '>
          <Image src="/user_placeholder.png" fill alt="user image" priority className='object-cover' />
        </Button>
      </SheetTrigger>
      <SheetContent className='z-[9999]'>
        <SheetHeader className='text-start space-y-0'>
          <SheetTitle>{data.name}</SheetTitle>
          <SheetDescription>
            {data.email}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">

        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => handleLogout()} type="submit">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UserProfileDropdown;