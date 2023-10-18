import { IssueStatusBadge } from "@/app/components"
import prisma from "@/prisma/client"
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

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
        <Heading>{issue.title}</Heading>
        <div className="flex gap-3 my-2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage