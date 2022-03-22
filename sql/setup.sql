DROP TABLE IF EXISTS publishers CASCADE; 
DROP TABLE IF EXISTS authors CASCADE; 

-- setting up tables
CREATE TABLE publishers (
    publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL, 
    city TEXT, 
    state TEXT, 
    country TEXT
); 

-- author Table
CREATE TABLE authors (
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    pob TEXT
);

-- seeding some data 
INSERT INTO 
    publishers (name, city, state, country)
VALUES
    ('Penguin Books', 'New York', 'NY', 'USA'),
    ('Lighthouse', 'Boston', 'CA', 'USA');
INSERT INTO 
    publishers (name, country)
VALUES  
    ('Harry Potter Publisher', 'UK');

-- author Data
INSERT INTO
    authors (name, dob, pob)
VALUES
    ('Ernest Hemingway', DATE '1899-07-21', 'Oakpark, IL'),
    ('Margaret Atwood', DATE '1939-11-18', 'Ottawa, CAN'),
    ('Julie Nisbit', DATE '2001-07-04', 'Santa Barbara, CA');

