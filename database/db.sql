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
    isActive BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(155) NOT NULL unique,
    emailUser VARCHAR(200) NOT NULL unique,
    username VARCHAR(200),
    passport VARCHAR(200),
    phone VARCHAR(200),
    image TEXT,
    isActive BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED NOT NULL,
    productID INT UNSIGNED NOT NULL,
    fecha_inicio DATETIME NOT NULL ,
    fecha_fin DATETIME NOT NULL,
    monto INT NOT NULL,
    statusB INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (productID) REFERENCES product (id),
    CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT UNSIGNED NOT NULL,
     productID INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    rating INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_posts FOREIGN KEY (productID) REFERENCES product (id),
    CONSTRAINT fk_user_posts FOREIGN KEY (userID) REFERENCES user (id)
);
