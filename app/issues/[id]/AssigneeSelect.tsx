"use client"

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignToUser = async (userId: String) => {
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
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || " "}
        onValueChange={assignToUser}>
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

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  },
  staleTime: 60 * 1000,
  retry: 3,
})

export default AssigneeSelect