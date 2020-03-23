# Install
```
npm install
```

# Database configuration file
A database must be installed and configured, create a .env config file accordingly.
PostgresSQL is used in this project.

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
