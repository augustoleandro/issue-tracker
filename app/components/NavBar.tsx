'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <div className='flex justify-between'>
          <div className="flex items-center gap-3">
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
          </div>
          <Box>
            {status === 'authenticated' && <Link href='/api/auth/signout'>Sign Out</Link>}
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
          </Box>
        </div>
      </Container>
    </nav >
  )
}

export default NavBar