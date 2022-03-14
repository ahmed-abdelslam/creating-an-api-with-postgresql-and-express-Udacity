import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const ENV = process.env.ENV;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
let POSTGRES_DB;
if (ENV === 'test') 
    POSTGRES_DB = process.env.POSTGRES_TEST_DB;
else 
    POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const client: Pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default client;