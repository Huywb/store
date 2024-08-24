'use client'
import React, { useState } from 'react'
import logo from '../../public/logo3.png'
import { Menu } from '@/lib/contants'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const LeftSideBar = () => {
    const PathName = usePathname()
  return (
    <div className='max-lg:hidden h-screen items-center left-0 top-0 sticky flex flex-col px-10 bg-blue-100' >
        <div>
        <Image src={logo} alt='logo' width={100} height={50}></Image>
        </div>
        <div className='flex flex-col gap-4 py-12 '>
            {Menu.map((item,index)=>(
                <Link href={item.url} key={index}>
                    <div className={`flex gap-2 items-center py-2 ${PathName==item.url ? 'text-blue-500' : ''}`}>
                        <div  className='text-2xl'>{item.icon}</div>
                        <p className='text-xl'>{item.label}</p>
                    </div>
                </Link>
            ))}
        </div>
        <div className='flex gap-2 items-start w-[100%]'>
            <UserButton></UserButton>
            <p className='font-bold text-xl'>Edit Profile</p>
        </div>
    </div>
  )
}

export default LeftSideBar