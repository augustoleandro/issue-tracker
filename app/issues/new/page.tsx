"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, CalloutRoot, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import { Spinner } from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>

function NewIssuePage() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState<String | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/issues', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      if (!response.ok) throw await response.json();
      router.push('/issues')
    } catch (error) {
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
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          name='description'
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage