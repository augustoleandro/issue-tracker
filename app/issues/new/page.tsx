"use client"

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form className='max-w-lg space-y-3' onSubmit={handleSubmit(async (data) => {
      await fetch('/api/issues', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      router.push('/issues')
    })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>

      <Controller
        control={control}
        name='description'
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage