'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

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
          <li key={label}>
            <Link href={href} className={classNames({
              'text-zinc-900 font-bold': currentPath === href,
              'text-zinc-500': currentPath !== href,
              'hover:text-zinc-800 transition-colors': true,
            })}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && <Link href='/api/auth/signout'>Sign Out</Link>}
        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
      </Box>
    </nav >
  )
}

export default NavBar