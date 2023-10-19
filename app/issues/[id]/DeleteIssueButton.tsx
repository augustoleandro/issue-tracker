import { TrashIcon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'

function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`} className='flex justify-center'>
      <Button color="red" className='w-full max-w-md'>
        <TrashIcon />
        Delete Issue
      </Button>
    </Link>
  )
}

export default DeleteIssueButton