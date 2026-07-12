import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useVideoQuery } from './requests/queries';
import { useUpdateVideoMutation } from './requests/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

const editVideoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(500),
  summary: z.string().min(3, 'Summary must be at least 3 characters').max(5000),
});

type EditVideoFormValues = z.infer<typeof editVideoSchema>;

function VideoEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: video, isLoading, error } = useVideoQuery(id!);
  const mutation = useUpdateVideoMutation();

  const form = useForm<EditVideoFormValues>({
    resolver: zodResolver(editVideoSchema),
    defaultValues: {
      title: '',
      summary: '',
    },
  });

  useEffect(() => {
    if (video) {
      form.reset({
        title: video.title,
        summary: video.summary,
      });
    }
  }, [video, form]);

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="text-destructive p-8 text-center">{error.message}</p>;
  if (!video) return <p className="p-8 text-center">Video not found</p>;

  const onSubmit = (values: EditVideoFormValues) => {
    mutation.mutate({ id: video.id, data: values }, { onSuccess: () => navigate(`/videos/${video.id}`) });
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Video</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-title">Title</FieldLabel>
                    <Input {...field} id="edit-title" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="summary"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-summary">Summary</FieldLabel>
                    <Textarea {...field} id="edit-summary" className="min-h-30" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Field>
                <FieldLabel className="text-muted-foreground">Facebook Link (read-only)</FieldLabel>
                <Input value={video.facebookLink || ''} disabled />
              </Field>

              <Field>
                <FieldLabel className="text-muted-foreground">Twitter Link (read-only)</FieldLabel>
                <Input value={video.twitterLink || ''} disabled />
              </Field>
            </FieldGroup>

            <div className="flex gap-2 pt-6">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>

            {mutation.isError && <p className="text-destructive mt-2 text-sm">{mutation.error.message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoEdit;
