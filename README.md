# Server Action in Next.js

This is a template for creating a server action in Next.js. It is a simple example of how to create a server action in Next.js.

## How do I use this?

1. Clone this repository.
```bash
# npm
npx create next-app --example https://github.com/tiesen243/next-server-action

# yarn
yarn create next-app --example https://github.com/tiesen243/next-server-action

# pnpm
pnpx create next-app --example https://github.com/tiesen243/next-server-action

# bun
bun create next-app --example https://github.com/tiesen243/next-server-action
```

2. Install the dependencies.
```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

# bun
bun install
```

3. Create a `.env` file in the root of the project and add the following content.
> Note: You can run `postgresql` by run the following command 

```bash
docker run --name postgresql -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:alpine
```

```bash
# .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

4. Run the development server.
```bash
# npm
npm run dev 
    
# yarn
yarn dev 

# pnpm 
pnpm dev 

# bun 
bun dev 
```

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
