'use client'

import { Suspense } from 'react'
import NavItems from './NavItems'

interface NavItemsWrapperProps {
  title: string
  param: string
}

export default function NavItemsWrapper({ title, param }: NavItemsWrapperProps) {
  return (
    <Suspense fallback={
      <div className="hover:text-amber-600 font-semibold animate-pulse">
        {title}
      </div>
    }>
      <NavItems title={title} param={param} />
    </Suspense>
  )
}
