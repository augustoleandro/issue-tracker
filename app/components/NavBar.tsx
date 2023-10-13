'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(({ href, label }) => (
          <Link key={label} href={href} className={classNames({
            'text-zinc-900 font-bold': currentPath === href,
            'text-zinc-500': currentPath !== href,
            'hover:text-zinc-800 transition-colors': true,
          })}>
            {label}
          </Link>
        ))}
      </ul>
    </nav >
  )
}

export default NavBar