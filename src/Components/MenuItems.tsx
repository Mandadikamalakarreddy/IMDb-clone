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
    <Link href={address} className="hover:text-amber-500">
      <Icon className="text-2xl sm:hidden" />
      <p className="uppercase hidden sm:inline text-base font-semibold ">{title}</p>
    </Link>
  )
}
