CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(255), 
    lastName VARCHAR(255), 
    password VARCHAR(255) NOT NULL
    );