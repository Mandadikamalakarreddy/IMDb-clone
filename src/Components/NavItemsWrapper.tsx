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
      <div className="px-4 py-2 rounded-full text-sm font-semibold text-dark-400 dark:text-dark-500 animate-pulse">
        {title}
      </div>
    }>
      <NavItems title={title} param={param} />
    </Suspense>
  )
}
