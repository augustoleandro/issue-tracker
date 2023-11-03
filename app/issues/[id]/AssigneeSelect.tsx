"use client"

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      return data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || " "}
        onValueChange={async (userId) => {
          const result = await fetch(`/api/issues/${issue.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              assignedToUserId: userId === " " ? null : userId
            })
          });
          console.log(result)
          if (!result.ok) {
            toast.error("Changes could not be saved")
          } else {
            toast.success("Changes saved")
          }
        }}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={" "}>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect