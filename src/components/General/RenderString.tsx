export const RenderString = (value: string) => {
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
