export const renderString = (value: string) => {
  return (
    <p>
      {value.split('\n').map((line) => (
        <>
          {line}
          <br />
        </>
      ))}
    </p>
  );
};
