"use client"

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueFormType = z.infer<typeof issueSchema>

function IssueForm({ issue }: { issue?: Issue }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormType>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState<String | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      let response: Response | null = null;
      if (issue) {
        response = await fetch(`/api/issues/${issue.id}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
        })
      } else {
        response = await fetch('/api/issues', {
          method: 'POST',
          body: JSON.stringify(data)
        })
      }
      if (!response || !response.ok) throw await response?.json();
      router.push('/issues')
      router.refresh()

    }

    catch (error) {
      setIsSubmitting(false)
      console.log(error)
      setError('An unexpected error occurred.')
    }
  })

  return (
    <div className='max-w-lg '>
      {error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          name='description'
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <div className='flex justify-between'>
          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{' '}
            {isSubmitting && <Spinner />}
          </Button>
          <Link href='/issues'>
            <Button color='red' disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default IssueForm