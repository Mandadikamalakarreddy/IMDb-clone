'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface NavItemsProps {
  title: string
  param: string
}

export default function NavItems({ title, param }: NavItemsProps) {
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre')
  
  return (
    <div>
      <Link
        className={`hover:text-amber-600 font-semibold ${
          genre === param
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`}
        href={`/?genre=${param}`}
      >
        {title}
      </Link>
    </div>
  )
}
