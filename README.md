# Written

Blog application using nostr.

## Getting Started

```bash
git clone https://github.com/silencesoft/written.git
cd written
yarn
cp .env.example .env.local
yarn dev
```

Modify the environment variables file:

- NEXT_PUBLIC_URL : Website url
- NEXTAUTH_URL : Website url
- NEXTAUTH_SECRET : Secret word for next authentication
- NEXT_PUBLIC_NAME : Application name, it shows this name in the header.
- NEXT_PUBLIC_RSS : (true - false) Create a RSS File (if it can write in folders).
- NEXT_PUBLIC_RSS_PUBLIC : (true - false) Use public directory ot tmp to save the file
- NEXT_PUBLIC_RELAY : Nostr Relay to be used. To use more than one, type them separated by commas.
- NEXT_PUBLIC_ADMIN : Administrator's public key.
- NEXT_PUBLIC_AUTHOR_1 NEXT_PUBLIC_AUTHOR_2 ... : Blog Publishers' public keys (any as required).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Thanks

My Nostr Public key: [npub1gcmpunjrue2aq5um7qgnp4p6uxarlxw2z6djehaf0emxjf6gr9us548zdf](nostr:npub1gcmpunjrue2aq5um7qgnp4p6uxarlxw2z6djehaf0emxjf6gr9us548zdf)

Buy me a coffee (with satoshis): [https://lncoffee.me/silencesoft](https://lncoffee.me/silencesoft)


