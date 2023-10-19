"use client"

import { useRouter } from 'next/navigation'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import { useState } from 'react'
import { Spinner } from '@/app/components'

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  async function deleteIssue() {
    try {
      setDeleting(true)
      const response = await fetch(`/api/issues/${issueId}`, { method: 'DELETE' })
      if (!response || !response.ok) throw await response?.json()
      setDeleting(false)
      router.push('/issues')
      router.refresh()

    } catch (error) {
      setError(true)
      setDeleting(false)
    }

  }

  return (
    <div className='flex justify-center'>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className='w-full max-w-md' disabled={isDeleting}>
            <TrashIcon />
            Delete Issue  {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant='soft' color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
          <Button color="gray" variant='soft' mt="4" onClick={() => setError(false)}>Close</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

export default DeleteIssueButton