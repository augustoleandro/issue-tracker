"use client"

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      setUsers(await response.json())
    }

    fetchUsers()
  }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect