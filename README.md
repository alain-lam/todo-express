# Install
```
npm install
```

# This API RESTFul uses PpostgreSQL
PostgreSQL must be installed and configured, change the db-postgres.js config file accordingly
Script to create required table
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