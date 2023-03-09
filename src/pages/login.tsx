import { Button, Container, Input, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
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

  const onSubmit = async (data: LoginForm) => {
    const response = await signIn('credentials', {
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

  return (
    <Container css={{ flex: 1, d: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    </Container>
  );
};

export default Login;
