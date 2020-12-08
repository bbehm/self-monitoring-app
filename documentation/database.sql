/* Add all necessary CREATE TABLE statements here */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

