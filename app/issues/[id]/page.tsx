import prisma from "@/prisma/client"
import { Box, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"
import { getServerSession } from "next-auth"
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"

interface IssueDetailPageProps {
  params: { id: string }
}

async function IssueDetailPage({ params }: IssueDetailPageProps) {
  const session = await getServerSession(authOptions)

  if (typeof params.id !== 'string') notFound()

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) return (
    notFound()
  )

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <div className="flex flex-col gap-2 mx-auto">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      </Box>}
    </Grid>
  )
}

export default IssueDetailPage