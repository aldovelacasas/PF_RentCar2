CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    model VARCHAR(200) NOT NULL,
    year INT,
    type VARCHAR(50),
    capacity INT,
    transmission VARCHAR(50),
    description VARCHAR(200),
    price VARCHAR(50),
    image TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
