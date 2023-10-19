import { Pencil2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`} className='flex justify-center'>
      <Button className="w-full max-w-md cursor-pointer">
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  )
}

export default EditIssueButton