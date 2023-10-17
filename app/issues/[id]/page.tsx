import { IssueStatusBadge } from "@/app/components"
import prisma from "@/prisma/client"
import { Card, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

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
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex gap-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage