-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert mock data into contacts table
INSERT INTO contacts (name, email, phone, "createdAt") VALUES
('John Doe', 'john.doe@example.com', '+1-555-123-4567', NOW()),
('Jane Smith', 'jane.smith@example.com', '+1-555-234-5678', NOW()),
('Alice Johnson', 'alice.j@example.com', '+1-555-345-6789', NOW()),
('Bob Wilson', 'bob.wilson@example.com', '+1-555-456-7890', NOW()),
('Carol Brown', 'carol.brown@example.com', '+1-555-567-8901', NOW()),
('David Lee', 'david.lee@example.com', '+1-555-678-9012', NOW()),
('Emma Davis', 'emma.davis@example.com', '+1-555-789-0123', NOW()),
('Frank Miller', 'frank.m@example.com', '+1-555-890-1234', NOW()),
('Grace Taylor', 'grace.t@example.com', '+1-555-901-2345', NOW()),
('Henry Clark', 'henry.c@example.com', '+1-555-012-3456', NOW()); 