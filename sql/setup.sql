DROP TABLE IF EXISTS publishers CASCADE; 
DROP TABLE IF EXISTS authors CASCADE; 
DROP TABLE IF EXISTS reviewers CASCADE; 
DROP TABLE IF EXISTS books CASCADE; 
DROP TABLE IF EXISTS reviews CASCADE; 

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
    released INT NOT NULL CHECK (released BETWEEN 1000 AND 3000), 
    CONSTRAINT fk_publisher
        FOREIGN KEY (publisher_id)
            REFERENCES publishers(publisher_id)
);

-- reviews table
CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL CHECK (rating<=5),
    reviewer_id BIGINT NOT NULL,
    review VARCHAR(140) NOT NULL,
    book_id BIGINT NOT NULL,
    CONSTRAINT fk_book
        FOREIGN KEY (book_id)
            REFERENCES books(book_id),
    CONSTRAINT fk_reviewer
        FOREIGN KEY (reviewer_id)
            REFERENCES reviewers(reviewer_id)
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
    
INSERT INTO
    reviews (rating, reviewer_id, review, book_id)
VALUES
    ('5', '1', 'Very confusing', '1'),
    ('3', '2', 'Still dont know what a div is', '2'),
    ('4', '3', 'How do you even center it?', '3');