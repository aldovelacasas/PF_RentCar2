ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';


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
    rating INT NOT NULL,
    isActive BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    passport VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL, 
    isActive BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED,
    productID INT UNSIGNED,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    statusB INT NOT NULL,
    CONSTRAINT fk_product FOREIGN KEY (productID) REFERENCES product (id),
    CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED,
    description TEXT NOT NULL,
    rating INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id)
);




