import { Button, Container, Input, Spacer } from '@nextui-org/react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { userAtom } from '@/state/user';

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
  const setUser = useSetAtom(userAtom);

  const onSubmit = (data: LoginForm) => {
    setUser({ pk: '1', sk: '1', ext: false });
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
              placeholder="nsecXXX"
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
