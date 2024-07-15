## README for Off-Chain Node Sale

# Overview

This is a Node.js application that sets up a PostgreSQL database and starts an Express.js server to serve the Off-Chain Node Sale application.

## Server Startup

cd off-chain-node-sale 

install dependecies: npm i

## Environment Variables

- The application relies on the following environment variables:

EXPRESS_SERVE_PORT: The port number to serve the Express.js application (default: 8080)
POSTGRESQL_DB: The name of the PostgreSQL database to create
POSTGRESQL_USERNAME: The username to use for the PostgreSQL connection
POSTGRESQL_PASSWORD: The password to use for the PostgreSQL connection
POSTGRES_PORT: The port number to use for the PostgreSQL connection (default: 5432)

## Database Creation
- The application creates a PostgreSQL database using the provided environment variables. If the database already exists, it will log a message indicating that the database already exists.  

start serving in development mode: 
- npm run dev

# Generate SQL Schema

### IGORE HERE ---

```ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:log -d src/data-source.ts```

# GENERATING MIGRATION
```ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations -d src/data-source.ts```

# Generate Migration From Entities
``` ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/TablesCreationInit ```

