import { Box, Card } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const LoadingIssuesDetailPage = async () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <div className="flex gap-3 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssuesDetailPage