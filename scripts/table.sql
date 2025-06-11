-- 1. Lage database
CREATE DATABASE IF NOT EXISTS TreningsGlede;

-- 2. Lage ny bruker
CREATE USER IF NOT EXISTS 'treningsuser'@'%' IDENTIFIED BY 'userpassword123';

-- 3. Gi tilgang til databasen
GRANT ALL PRIVILEGES ON TreningsGlede.* TO 'treningsuser'@'%';

-- 4. Aktivere endringene
FLUSH PRIVILEGES;

-- 5. Bruke databasen
USE TreningsGlede;

-- 6. Lage users-tabellen
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Lage sessions-tabellen
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(512) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
