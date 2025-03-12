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
npx knex migrate:make create_users_table --knexfile knexfile.ts // create migration
npx knex migrate:latest --knexfile knexfile.ts                  //  run migation on db
```