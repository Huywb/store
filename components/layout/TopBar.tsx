'use client'
import { Menu } from '@/lib/contants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import logo from '../../public/logo3.png'
import { CiMenuBurger } from "react-icons/ci";


const TopBar = () => {
    const pathName = usePathname()
    const [dropdown,setDropdown] = useState(false)

  return (
    <div className='items-center z-20 left-0 top-0 sticky flex justify-between px-6 bg-blue-100 lg:hidden'>
        <Image src={logo} alt='logo' width={100} height={50}></Image>
        <div className='flex  gap-4  max-md:hidden'>
            {Menu.map((item:any,index:number)=>(
                <Link href={item.url} key={index}>
                    <div className={`flex gap-2 items-center py-2 ${pathName==item.url ? 'text-blue-500' : ''}`}>
                        <p className='text-lg'>{item.label}</p>
                    </div>
                </Link>
            ))}
        </div>
        <div className='relative flex gap-2 items-center '>
          <div className='md:hidden cursor-pointer' onClick={()=>setDropdown(!dropdown)}>
          <CiMenuBurger />
          </div>
          {dropdown && (
            <div className='absolute flex flex-col gap-2 top-10 right-6 px-2 rounded-lg bg-[#fafafa]'>
            {Menu.map((item:any,index:number)=>(
                <Link href={item.url} key={index}>
                    <div className={`flex gap-2 items-center py-2 ${pathName==item.url ? 'text-blue-500' : ''}`}>
                        <div  className='text-lg'>{item.icon}</div>
                        <p className='text-lg'>{item.label}</p>
                    </div>
                </Link>
            ))}
          </div>
          )}
            <UserButton></UserButton>
        </div>
    </div>
  )
}

export default TopBar