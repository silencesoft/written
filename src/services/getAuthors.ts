export const getAuthors = async () => {
  const endpoint = `${process.env.NEXT_PUBLIC_URL}/api/authors`;

  const options = {
    method: 'GET',
  };

  const response = await fetch(endpoint, options);

  const authors = await response.json();

  return authors.authors;
};
