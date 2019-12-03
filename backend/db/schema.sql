DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(200),
    email VARCHAR(200),
    image VARCHAR(500),
    description VARCHAR(5000),
    title VARCHAR(200),
    instagram VARCHAR(200),
    facebook VARCHAR(200),
    info VARCHAR(5000)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    cover VARCHAR(500)
);

CREATE TABLE galleries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    cover VARCHAR(500)
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    cover VARCHAR(500),
    img VARCHAR(500),
    event_id INT REFERENCES events(id),
    gallery_id INT REFERENCES events(id)
);