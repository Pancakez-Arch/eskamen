-- 1. Use the correct schema
DROP DATABASE IF EXISTS treningsglad;
CREATE DATABASE treningsglad DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE treningsglad;

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Instructors table
CREATE TABLE IF NOT EXISTS instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL
);

-- 4. Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    instructor_id INT,
    token VARCHAR(512) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    session_date DATE,
    start_time TIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

-- 5. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- 6. Exercises table
CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sets INT,
    reps INT,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- 7. Example data for instructors
INSERT INTO instructors (name, role) VALUES
  ('Alice Example', 'Coach'),
  ('Bob Example', 'Trainer');

-- 8. Example data for users
INSERT INTO users (username, email, password) VALUES
  ('user1', 'user1@example.com', 'password1'),
  ('user2', 'user2@example.com', 'password2');

-- 9. Example data for sessions
INSERT INTO sessions (user_id, instructor_id, token, expires_at, is_active, session_date, start_time)
VALUES (1, 1, 'token1', '2025-07-01 12:00:00', TRUE, '2025-06-12', '10:00:00'),
       (2, 2, 'token2', '2025-07-02 12:00:00', TRUE, '2025-06-13', '11:00:00');

-- 10. Example data for bookings
INSERT INTO bookings (user_id, session_id, status) VALUES
  (1, 1, 'active'),
  (2, 2, 'active');

-- 11. Example data for exercises
INSERT INTO exercises (session_id, name, description, sets, reps, duration_minutes) VALUES
  (1, 'Push-ups', 'Standard push-ups for upper body strength.', 3, 12, NULL),
  (1, 'Squats', 'Bodyweight squats for legs.', 3, 15, NULL),
  (2, 'Plank', 'Hold plank position for core stability.', NULL, NULL, 2),
  (2, 'Jumping Jacks', 'Cardio warm-up exercise.', 2, 30, NULL),
  (1, 'Lunges', 'Alternating lunges for legs and balance.', 3, 10, NULL),
  (2, 'Burpees', 'Full-body exercise for strength and cardio.', 2, 10, NULL);
