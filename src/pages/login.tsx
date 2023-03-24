import { Button, Container, Divider, Input, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';

type Props = {};

interface LoginForm {
  key: string;
}

const Login: React.FC<Props> = (props: Props) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    const response = await signIn('secret', {
      redirect: false,
      key: data.key,
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/user`,
    });

    if (response?.error) {
      setError('key', { message: response.error });
      return;
    }

    router.push('/');
  };

  const handleLogin = async () => {
    if (!window?.nostr) {
      throw new Error('window.nostr not found!');
    }

    try {
      const pk = await window?.nostr?.getPublicKey();
      const isLoggedIn = pk != null && pk.length > 0;

      const response = await signIn('extension', {
        redirect: false,
        key: pk,
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/user`,
      });

      if (response?.error) {
        setError('key', { message: response.error });
        return;
      }

      router.push('/');
    } catch (err) {
      console.log('Rejected');
    }
  };

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hydrated) {
    return <></>;
  }

  return (
    <Container css={{ flex: 1, d: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Container css={{ d: 'flex', alignItems: 'flex-start', flexDirection: 'column', maxWidth: 300 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="key"
            control={control}
            defaultValue=""
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.Password
                clearable
                underlined
                label="Secret key:"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="(hex)"
                color={errors?.key ? 'error' : 'default'}
                helperColor={errors?.key ? 'error' : 'default'}
                helperText={errors?.key ? errors.key.message : ''}
              />
            )}
          />
          <Spacer y={1} />
          <Button type="submit">Login</Button>
        </form>
        {window?.nostr && (
          <>
            <Spacer y={1} />
            <Divider />
            <Spacer y={1} />
            <Button onPress={handleLogin}>Login with Extension</Button>
          </>
        )}
      </Container>
    </Container>
  );
};

export default Login;
