CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
	MSSV VARCHAR(50),
    page INT,
    start VARCHAR(255),
    role VARCHAR(50),
    status BOOLEAN DEFAULT true
);