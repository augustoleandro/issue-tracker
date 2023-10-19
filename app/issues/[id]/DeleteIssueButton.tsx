"use client"

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, AlertDialogTrigger, Button, Flex, Link } from '@radix-ui/themes'

function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href="" className='flex justify-center'>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className='w-full max-w-md'>
            <TrashIcon />
            Delete Issue
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
              <Button color="red">Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Link>
  )
}

export default DeleteIssueButton