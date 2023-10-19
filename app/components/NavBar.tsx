'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Text } from '@radix-ui/themes'

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
            {status === 'authenticated' &&
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar className="cursor-pointer hover:outline hover:outline-4 hover:outline-violet-400" src={session.user!.image!} fallback="?" size="2" radius='full' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            }
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
          </Box>
        </div>
      </Container>
    </nav >
  )
}

export default NavBar