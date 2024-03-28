'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { SubmitHandler } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@nx-react-monorepo/components';

const commentSchema = z.object({
  body: z.string().min(1, { message: 'Comment body is required' }),
});

type FormValues = z.infer<typeof commentSchema>;

const defaultValues: FormValues = {
  body: '',
};

type Props = {
  handleNewComment: ({ body }: { body: string }) => void | Promise<void>;
  isLoading: boolean;
};

const CommentForm = ({ handleNewComment, isLoading }: Props): JSX.Element => {
  const formProps = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(commentSchema),
  });

  const onSubmitSuccess: SubmitHandler<FormValues> = async (values) => {
    handleNewComment({ body: values.body });
  };

  return (
    <Form {...formProps}>
      {formProps.formState.errors.root && (
        <p className="text-center my-2 font-semibold text-red-700">
          {formProps.formState.errors.root.message}
        </p>
      )}

      <form
        className=" bg-slate-100 w-full p-2 mt-4 flex flex-col gap-4 mx-auto [&>div>textarea]:bg-inherit"
        onSubmit={formProps.handleSubmit(onSubmitSuccess)}
      >
        <FormField
          control={formProps.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Type your comment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-4 flex gap-4 justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-2 py-1 rounded-lg text-center text-white border disabled:opacity-70 bg-green-600 hover:bg-green-700 active:bg-green-800  border-green-900"
          >
            submit
          </button>
          <button
            type="reset"
            onClick={() => formProps.reset()}
            disabled={isLoading}
            className="px-2 py-1 rounded-lg text-center text-white border disabled:opacity-70 bg-slate-600 hover:bg-slate-700 active:bg-slate-800  border-slate-900"
          >
            reset
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
