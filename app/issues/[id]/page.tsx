import prisma from "@/prisma/client"
import { Box, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface IssueDetailPageProps {
  params: { id: string }
}

async function IssueDetailPage({ params }: IssueDetailPageProps) {
  if (typeof params.id !== 'string') notFound()

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) return (
    notFound()
  )

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage