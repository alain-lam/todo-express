# Install
```
npm install
```


# Database configuration file
A database must be installed and configured, create a .env config file accordingly.
PostgresSQL is used in this project.
```
/* Dev configuration */
DEV_DB_HOST=
DEV_DB_PORT=
DEV_DB_DATABASE=
DEV_DB_USER=
DEV_DB_PASSWORD=

/* Test configuraion */
TEST_DB_HOST=
TEST_DB_PORT=
TEST_DB_DATABASE=
TEST_DB_USER=
TEST_DB_PASSWORD=
```


# PostgreSQL
Script to create required table:
```
CREATE TABLE todo ( 
    ID SERIAL PRIMARY KEY,
    title VARCHAR(30),
    content VARCHAR(200),
    creator VARCHAR(30),
    completed bool,
    isShared bool
);
```
