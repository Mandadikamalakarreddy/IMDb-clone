import React from 'react'
import MenuItems from './MenuItems'
import { AiFillHome } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Link from 'next/link'


export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 mx-auto max-w-6xl'>
      <div className='flex gap-4 '>
          <MenuItems title="Home" address="/" Icon={AiFillHome}/>
          <MenuItems title="About" address="/about" Icon={BsFillInfoCircleFill}/>
      </div>
      <div className='flex items-center gap-4'>
        <Link href={"/"} className='flex items-center gap-2'>
        <span className='bg-amber-600 text-2xl font-bold px-2 py-1 rounded-lg'>IMDb</span>
        <span className='text-xl font-normal hidden sm:inline'>Clone</span>
      </Link>
    </div>
    </div>
  )
}
