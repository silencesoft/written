import { Button, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {};

const ToggleTheme: React.FC<Props> = (props: Props) => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <>
      <Button
        light
        auto
        color="error"
        onClick={() => setTheme(!isDark ? 'dark' : 'light')}
        icon={isDark ? <FaSun /> : <FaMoon />}
        aria-label={isDark ? 'Toggle Light' : 'Toggle Dark'}
      />
    </>
  );
};

export default ToggleTheme;
