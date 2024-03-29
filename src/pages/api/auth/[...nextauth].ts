import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getPublicKey } from 'nostr-tools';

type ExtendedUser = User & { id?: string };

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'secret',
      credentials: {
        key: { label: 'Secret Key', type: 'text' },
      },
      async authorize(credentials, req) {
        const key = credentials?.key || '';
        const publicKey = getPublicKey(key);

        if (!publicKey) {
          throw new Error('Invalid key');
        }

        const authors: string[] = [];

        authors.push(process.env.NEXT_PUBLIC_ADMIN || '');

        Object.keys(process.env).forEach((element) => {
          if (element.startsWith('NEXT_PUBLIC_AUTHOR') && !!process.env[element]) {
            authors.push(process.env[element] || '');
          }
        });

        if (authors.includes(publicKey)) {
          const user: ExtendedUser = {
            id: key,
            image: key,
            name: publicKey,
          };

          return user;
        } else {
          throw new Error('Invalid key');
        }
      },
    }),
    CredentialsProvider({
      name: 'Extension',
      id: 'extension',
      credentials: {
        key: { label: 'Secret Key', type: 'text' },
      },
      async authorize(credentials, req) {
        const publicKey = credentials?.key || '';

        if (!publicKey) {
          throw new Error('Invalid key');
        }

        const authors: string[] = [];

        authors.push(process.env.NEXT_PUBLIC_ADMIN || '');

        Object.keys(process.env).forEach((element) => {
          if (element.startsWith('NEXT_PUBLIC_AUTHOR') && !!process.env[element]) {
            authors.push(process.env[element] || '');
          }
        });

        if (authors.includes(publicKey)) {
          const user: ExtendedUser = {
            id: publicKey,
            image: publicKey,
            name: publicKey,
          };

          return user;
        } else {
          throw new Error('Invalid key');
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
