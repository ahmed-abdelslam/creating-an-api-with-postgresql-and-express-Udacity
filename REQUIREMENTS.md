# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [GET] /products 
- Show [GET] /products/:id
- Create [POST] /products [token required]
- Update [PUT] /products/:id [token required]
- Delete [DELETE] /products/:id [token required]

#### Users
- Index [GET] /users [token required]
- Show [GET] /users/:id [token required]
- Create [POST] /users
- Update [PUT] /users/:id [token required]
- Delete [DELETE] /users/:id [token required]
- Login [POST] /users/login

#### Orders
- Index [GET] /orders [token required]
- Show [GET] /orders/:id [token required]
- Create [POST] /orders [token required]
- Update [PUT] /orders/:id [token required]
- Delete [DELETE] /orders/:id [token required]
- Current Order by user (args: user id) [GET] /orders/user/:user_id [token required]
- Add product to an order (args: order_id) [POST] /order/:id/products [token required]

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY, 
- name VARCHAR(255) NOT NULL, 
- price integer NOT NULL, 
- category VARCHAR(255)

#### User
- id SERIAL PRIMARY KEY,
- username VARCHAR(255) NOT NULL UNIQUE,
- firstName VARCHAR(255), 
- lastName VARCHAR(255), 
- password VARCHAR(255) NOT NULL

#### Orders
- id SERIAL PRIMARY KEY,
- status VARCHAR(65),
- user_id BIGINT REFERENCES users(id)

#### Order_products
- id SERIAL PRIMARY KEY,
- quantity INTEGER NOT NULL,
- order_id BIGINT REFERENCES orders(id),
- product_id BIGINT REFERENCES products(id)

