import React from 'react'
import MenuItems from './MenuItems'
import { AiFillHome } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Link from 'next/link'
import { ThemeToggleButton } from './theme-toggle-button'


export default function Header() {
  return (
    <div className='flex justify-between items-center p-4 mx-auto max-w-7xl'>
      <div className='flex gap-5'>
          <MenuItems title="Home" address="/" Icon={AiFillHome}/>
          <MenuItems title="About" address="/about" Icon={BsFillInfoCircleFill}/>
      </div>
      <div className='flex items-center gap-4'>
         <ThemeToggleButton
        variant="gif"
        url="https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
      />
        <Link href={"/"} className='flex items-center gap-2 group'>
        <span className='bg-gradient-to-r from-neon-pink to-neon-pink-light text-white text-2xl font-extrabold px-3 py-1 rounded-xl shadow-lg'>IMDb</span>
        <span className='text-lg font-medium text-dark-400 dark:text-dark-300 hidden sm:inline group-hover:text-neon-pink'>Clone</span>
      </Link>
    </div>
    </div>
  )
}
