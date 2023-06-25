# Chatbot UI Relational Database Management System Extension

This extension provides PostgreSQL, MySQL, MariaDB, and CockroachDB support to [Chatbot UI](https://github.com/jorge-menjivar/chatbot-ui).

## Installation

### Step 1

Add the database extension with npm:

```sh
npm i @chatbot-ui/rdbms@latest
```

### Step 2

Install the corresponding database driver.
See the corresponding drivers [here](https://github.com/typeorm/typeorm#installation).

### Step 3

Update `/utils/app/extensions/database.ts` to use the new database.

```typescript
import { Database } from '@chatbot-ui/core';
// Import the client-side of the database
import { ClientSideDatabase } from '@chatbot-ui/rdbms/client-side';

let database: Database | null = null;

export const getDatabase = async () => {
  if (database) {
    return database;
  } else {
    // Create a new instance of the client-side
    database = new ClientSideDatabase();
    await database.connect();
    return database;
  }
};
```

### Step 4

Create or update `/utils/server/extensions/database.ts` so it used the server side of the database.

```typescript
import { ServerDatabase } from '@chatbot-ui/core';
// Import the server-side of the database
import { ServerSideDatabase } from '@chatbot-ui/rdbms/server-side';

export const getServerDatabase = async () => {
  // Create a new instance of the server-side
  const database: ServerDatabase = new ServerSideDatabase();
  await database.connect();
  return database;
};
```

## Configuration

**Note:** Google Cloud may require the `RDBMS_SSL_HOST` env variable, which will look something like this: `9-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.us-west1.sql.goog`. Which will be displayed in an error message returned by the server.

Use the following env variables to configure your connection:

| Environment Variable                  | Default value | Description                                                                                                                                               |
| ------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RDBMS_DB_TYPE                         | `postgres`    | Type of database. Either `postgres`, `cockroachdb`, `mysql`, or `mariadb`. See [here](https://typeorm.io/data-source-options#common-data-source-options). |
| RDBMS_HOST                            | `127.0.0.1`   | The host of the RDBMS instance                                                                                                                            |
| RDBMS_PORT                            | `5432`        | The port of the RDBMS instance                                                                                                                            |
| RDBMS_DB                              | `postgres`    | The database name of the RDBMS instance                                                                                                                   |
| RDBMS_USER                            | `postgres`    | The username of the RDBMS instance                                                                                                                        |
| RDBMS_PASS                            | `password`    | The password of the RDBMS instance                                                                                                                        |
| RDBMS_SYNCHRONIZE                     | `true`        | Whether to create tables from entities. Should be `false` in production.                                                                                  |
| RDBMS_SSL_ENABLED                     | `false`       | Whether to require SSL to connect to the database.                                                                                                        |
| RDBMS_SSL_HOST                        |               | The hostname of the database server you are connecting to. Google Cloud may require this.                                                                 |
| RDBMS_SSL_CA                          |               | The Server CA certificate used for SSL connections, in the form of a single line string.                                                                  |
| RDBMS_SSL_CERT                        |               | The Client certificate used for SSL connections, in the form of a single line string.                                                                     |
| RDBMS_SSL_KEY                         |               | The Client certificate key used for SSL connections, in the form of a single line string.                                                                 |
| RDBMS_COCKROACHDB_TIME_TRAVEL_QUERIES | `false`       | Wether to user time travel queries features in CockroachDB                                                                                                |
