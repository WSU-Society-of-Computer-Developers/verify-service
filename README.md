# Verify-Service

An easily deployable verification service.

![preview1](public/ss1.png)
![preview2](public/ss2.png)

## Getting Started

First, create a `.env` file containing the following properties:
*(You may need to create an [hcaptcha](https://hcaptcha.com) account for human verification.)*
```
NEXT_PUBLIC_SITEKEY=<public_key_from_hcaptcha.com>
SECRETKEY=<private_key_from_hcaptcha.com>
DB_USER=root
DB_PASS=mypwd_is_strong
```

## Docker

Build your preferred Docker environment, for this example, we will be using deploying a production build.

1. Build the prod Docker image:
   ```sh
   docker compose -f docker-compose.prod.yml build
   ```
2. Now deploy the stack:
   ```sh
   docker compose -f docker-compose.prod.yml up -d
   ```
3. Access the site @ `localhost:3000`
## Node

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
