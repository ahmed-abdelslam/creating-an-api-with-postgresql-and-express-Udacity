CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    price integer NOT NULL, 
    category VARCHAR(255)
    );