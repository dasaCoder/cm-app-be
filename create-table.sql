-- Create contacts table
DROP TABLE IF EXISTS contacts;

CREATE TABLE
    IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW ()
    );

-- Create index on email for better performance
CREATE UNIQUE INDEX contacts_email_idx ON contacts (email);