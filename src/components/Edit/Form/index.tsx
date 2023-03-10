import { Button, Container, Input, Loading, Spacer, Text, Textarea } from '@nextui-org/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dateToUnix, useNostr } from 'nostr-react';
import { getEventHash, getPublicKey, signEvent, verifySignature, type Event as NostrEvent } from 'nostr-tools';
import React, { Suspense, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import MarkdownEditor from '@/components/Form/MarkdownEditor';
import { useGetPosts } from '@/hooks/useGetPosts';
import { filterAtom, postsAtom } from '@/state/nostr';

type Props = {};

interface EditForm {
  title: string;
  image: string;
  slug: string;
  summary: string;
  tags: string;
  content: string;
  published_at: number;
}

const Form: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const setFilter = useSetAtom(filterAtom);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditForm>();
  const { publish } = useNostr();
  const { data: session } = useSession();
  const posts = useAtomValue(postsAtom);

  const onSubmit = async (data: EditForm) => {
    const tags = data.tags.split(',');
    const date = dateToUnix();

    const event: NostrEvent = {
      content: data.content,
      kind: 30023,
      tags: [
        ['d', data.slug],
        ['title', data.title],
        ['image', data.image],
        ['summary', data.summary],
        ['published_at', id !== '0' ? posts[0].published_at.toString() : date.toString()],
      ],
      created_at: date,
      pubkey: getPublicKey(session?.user?.image || ''),
      id: '',
      sig: '',
    };

    tags.forEach((tag) => {
      event.tags.push(['t', tag.trim()]);
    });

    try {
      event.id = getEventHash(event);
      event.sig = signEvent(event, session?.user?.image || '');

      publish(event);

      const ok = verifySignature(event);

      if (ok) {
        router.push('/');
      } else {
        setError('title', { message: 'Error in server' });
      }
    } catch (e) {
      setError('title', { message: 'Error in server' });
    }
  };

  useEffect(() => {
    if (id !== '0') {
      setFilter({ type: 'post', value: id?.toString() || '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id === '0' || !posts.length || !posts[0].id) return;

    const post: EditForm = {
      title: posts[0].title,
      image: posts[0].image,
      slug: posts[0].slug,
      summary: posts[0].summary,
      tags: posts[0].tags.join(','),
      content: posts[0].content,
      published_at: posts[0].published_at,
    };

    reset(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length]);

  useGetPosts({});

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              css={{ width: '100%' }}
              clearable
              underlined
              label="title:"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              color={errors?.title ? 'error' : 'default'}
              helperColor={errors?.title ? 'error' : 'default'}
              helperText={errors?.title ? errors.title.message : ''}
            />
          )}
        />
        <Spacer y={1} />
        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              css={{ width: '100%' }}
              clearable
              underlined
              label="Image:"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              color={errors?.image ? 'error' : 'default'}
              helperColor={errors?.image ? 'error' : 'default'}
              helperText={errors?.image ? errors.image.message : ''}
            />
          )}
        />
        <Spacer y={1} />
        <Controller
          name="slug"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              clearable
              underlined
              css={{ width: '100%' }}
              label="Slug:"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              color={errors?.slug ? 'error' : 'default'}
              helperColor={errors?.slug ? 'error' : 'default'}
              helperText={errors?.slug ? errors.slug.message : ''}
            />
          )}
        />
        <Spacer y={1} />
        <Controller
          name="summary"
          control={control}
          defaultValue=""
          rules={{ required: 'Required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              underlined
              css={{ width: '100%' }}
              label="Summary:"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              color={errors?.summary ? 'error' : 'default'}
              helperColor={errors?.summary ? 'error' : 'default'}
              helperText={errors?.summary ? errors.summary.message : ''}
            />
          )}
        />
        <Spacer y={1} />
        <Controller
          name="tags"
          control={control}
          defaultValue=""
          rules={{ required: 'Required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              clearable
              underlined
              css={{ width: '100%' }}
              label="Tags: (comma separated)"
              value={value}
              placeholder="tag1,tag2"
              onChange={onChange}
              onBlur={onBlur}
              color={errors?.slug ? 'error' : 'default'}
              helperColor={errors?.slug ? 'error' : 'default'}
              helperText={errors?.slug ? errors.slug.message : ''}
            />
          )}
        />
        <Spacer y={1} />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: 'Required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Suspense fallback={<Loading />}>
              <Text
                color={errors?.content ? 'error' : 'default'}
                css={{
                  fontSize: 14,
                }}
              >
                Content
              </Text>
              <MarkdownEditor
                style={{ width: '100%', minHeight: 300 }}
                value={value}
                onChange={onChange}
                color={errors?.content ? 'error' : 'default'}
                data-color-mode="dark"
                visible={true}
                // helperColor={errors?.summary ? 'error' : 'default'}
                // helperText={errors?.summary ? errors.summary.message : ''}
              />
              {errors?.summary ? (
                <Text
                  color="error"
                  css={{
                    fontSize: 10,
                  }}
                >
                  {errors.summary.message}
                </Text>
              ) : (
                ''
              )}
            </Suspense>
          )}
        />

        <Spacer y={2} />
        <Button type="submit">Publish</Button>
      </form>
    </Container>
  );
};

export default Form;
