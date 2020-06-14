#### Hello Everyone!
So, today I'll show you how to configure your code to make tests with TypeORM and Jest.

## Modules
First thing first, let's install some modules in our node environment. I'm using yarn:

`yarn add jest ts-jest @types/jest -D`

`yarn add typeorm typescript pg`

Then, let's create our tsconfig file:
`yarn tsc --init`

## Jest configs
Ok, now we need to configure our jest.config.js and there are my conigs: 

```javascript
module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '!**/__tests__/coverage/**',
    '!**/__tests__/utils/**',
    '!**/__tests__/images/**',
  ],
};
```
I like to make a directory named __tests__ in the root of the project to make tests.

## TypeORM configs
And I like to create a ormconfig.js. Be comfortable to make a .json or .env.

```javascript
module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tests',
  dropSchema: true,
  logging: false,
  synchroize: true,
  migrationsRun: true,

  entities: ['src/database/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },
};
```

So, let the `dropSchema: true` because this will delete your data after the tests.

I like to let `migrationsRun: true` to automatically run migrations before the tests.

I'm using postgres, but be comfortable to use your favorite database.

## Creating connection file
Let's create a connection.ts to export some functions to run in our tests.

```javascript
import {createConnection, getConnection} from 'typeorm';

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close()codcd 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
```

The clear method will delete all data for every single entity registered in our connection.

## Creating a test
So, in your tests, just put this code: 

```javascript
import connection from '../src/connection';

beforeAll(async ()=>{
  await connection.create();
});

afterAll(async ()=>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it('creates a user', () => {
  // TODO
})
```
And that's it :)

## Github project

If you want to see the full project just click [here](https://github.com/caiulucas/jest-typeorm)