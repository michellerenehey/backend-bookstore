DROP TABLE IF EXISTS publishers CASCADE; 
DROP TABLE IF EXISTS authors CASCADE; 
DROP TABLE IF EXISTS reviewers CASCADE; 
DROP TABLE IF EXISTS books CASCADE; 

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

-- reviewers table
CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

-- books table
CREATE TABLE books (
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    publisher_id BIGINT NOT NULL,
    released INT NOT NULL,
    CONSTRAINT fk_publisher
        FOREIGN KEY (publisher_id)
            REFERENCES publishers(publisher_id)
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
    ('Ernest Hemingway', '7/21/1899', 'Oakpark, IL'),
    ('Margaret Atwood', '11/18/1939', 'Ottawa, CAN'),
    ('Julie Nisbit', '7/4/2001', 'Santa Barbara, CA');

-- reviewers seed data
INSERT INTO     
    reviewers (name, company)
VALUES
    ('Michelle', 'Google'),
    ('Brett', 'Tesla'),
    ('Kevin', 'Meta'),
    ('Bailey', 'Netflix');

INSERT INTO
    books (title, publisher_id, released)
VALUES
    ('Data Structures and Algorithms', '2', '2018'),
    ('How to Graduate Alchemy', '1', '2018'),
    ('What is a Div', '3', '2022'),
    ('To Div or Not to Div', '3', '2021');
    
