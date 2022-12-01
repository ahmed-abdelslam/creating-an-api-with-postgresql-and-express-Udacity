# Storefront Backend Project

## Install Packages
- First run `npm i` to install packages.
- install db-migrate globally `npm i -g db-migrate`

## DB Creation and Migrations

1. In your terminal run `psql -U postgres`
2. Create a user `CREATE USER udacity_user WITH PASSWORD 'password';`
3. Create the two databases: 
    `CREATE DATABASE udacity_store_front;`
    `CREATE DATABASE udacity_store_front_test;`
4. Grant all priviliges to our user
    `GRANT ALL PRIVILEGES ON DATABASE udacity_store_front TO udacity_user;`
    `GRANT ALL PRIVILEGES ON DATABASE udacity_store_front_test TO udacity_user;`
5. run `db-migrate up`

Now you can access the database from `127.0.0.1:5432`

## Start the server

Run `npm run watch`.
You can access the app from `127.0.0.1:3000`

## Test models and endpoints
 
Run `npm run test`
