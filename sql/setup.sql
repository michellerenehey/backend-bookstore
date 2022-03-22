DROP TABLE IF EXISTS publishers CASCADE; 

-- setting up tables
CREATE TABLE publishers (
    publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL, 
    city TEXT, 
    state TEXT, 
    country TEXT
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

