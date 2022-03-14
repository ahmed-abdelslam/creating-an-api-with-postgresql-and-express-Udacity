# Storefront Backend Project

## Getting Started

First run `npm i` to install packages.

## Required Technologies
Your device should have the following:
- Postgres for the database
- db-migrate for migrations `npm i -g db-migrate`

## DB Creation and Migrations

1. Change the postgres user and password in both `.env` and `database.json`. And make sure yours potsgress' host is `127.0.0.1` and the port is `5432`.
2. run `npm run db-create` to create the database
3. run `db-migrate up`

## Start the server

Run `npm run watch`.
You can access the app from `127.0.0.1:3000`

## Test models and endpoints

Run `npm run test`