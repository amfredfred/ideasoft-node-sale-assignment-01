# Generate SQL Schema
```ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:log -d src/data-source.ts```

# GENERATING MIGRATION
```ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations -d src/data-source.ts```

# Generate Migration From Entities
``` ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/TablesCreationInit ```
