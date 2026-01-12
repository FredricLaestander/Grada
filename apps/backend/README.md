# Backend

## Getting started

Create a copy of [`.env.example`](.env.example), and fill in your configurations

Install the dependencies:

```bash
bun install
```

## Development

To start the development server, run the project (preferably from the [root](../../README.md)):

```bash
bun run dev
```

## Database connection

To connect to a local database:

Start Prisma postgres:

```bash
bunx prisma dev
```

Start Prisma Studio:

```bash
bunx prisma studio
```
