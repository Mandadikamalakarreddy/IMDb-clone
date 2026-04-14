import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface MenuItemsProps {
  title: string
  address: string
  Icon: IconType
}

export default function MenuItems({ title, address, Icon }: MenuItemsProps) {
  return (
    <Link href={address} className="text-dark-400 dark:text-dark-300 hover:text-neon-pink dark:hover:text-neon-pink transition-colors duration-300">
      <Icon className="text-2xl sm:hidden" />
      <p className="uppercase hidden sm:inline text-sm font-semibold tracking-wide">{title}</p>
    </Link>
  )
}
