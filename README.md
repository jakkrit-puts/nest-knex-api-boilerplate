## Description

Nest.js with Knex Query Builder Boilerplate

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Migration
```bash
npx knex init	// Creates a knexfile.js config
npx knex migrate:make migration_name	// Creates a migration file
npx knex migrate:latest	// Runs pending migrations
npx knex migrate:rollback	// Rolls back the last migration
npx knex migrate:rollback --all	 // Rolls back all migrations
npx knex migrate:status	// Shows migration status
npx knex seed:make seed_name	// Creates a seed file
npx knex seed:run	// Runs all seeds

## Example ##
npx knex migrate:make create_users_table --knexfile knexfile.ts // create migration
npx knex migrate:latest --knexfile knexfile.ts                  //  run migation on db
```