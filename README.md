# Online Book Review System

## Project Overview

Online Book Review System is a full-stack web application where users can:

* Register and log in securely using JWT authentication
* Add books with title, author, genre, and description
* View all books with average ratings
* Open a single book details page
* Add reviews and ratings for books
* View all reviews for a book

The project is built using React for the frontend and FastAPI + MySQL for the backend.

---

# Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS
* React Icons
* Vite

## Backend

* FastAPI
* JWT Authentication
* Uvicorn
* MySQL
* MySQL Connector
* Pydantic

## Database

* MySQL Workbench

---

# Features

## Authentication Module

* User Registration
* User Login
* JWT Token Authentication
* Protected Routes
* Logout Functionality

## Book Module

* Add New Book
* View All Books
* View Single Book Details
* Display Average Rating
* Display Book Added By User

## Review Module

* Add Review
* View All Reviews
* Dynamic Review Rendering
* Review Rating System

---

# Database Tables

## Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registerPageUserName VARCHAR(100),
    registerUserMailID VARCHAR(100) UNIQUE,
    registerUserPassword VARCHAR(255)
);
```

## Books Table

```sql
CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    genre VARCHAR(50),
    description TEXT,
    added_by INT,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (added_by) REFERENCES users(id) ON DELETE CASCADE
);
```

## Reviews Table

```sql
CREATE TABLE Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    rating INT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

# API Endpoints

## Authentication Routes

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/register_user` | Register New User |
| POST   | `/login_user`    | Login User        |

## Book Routes

| Method | Endpoint                               | Description             |
| ------ | -------------------------------------- | ----------------------- |
| POST   | `/add_new_book`                        | Add New Book            |
| GET    | `/get_all_books`                       | Fetch All Books         |
| GET    | `/view_book_details/book_id/{book_id}` | Get Single Book Details |

## Review Routes

| Method | Endpoint                     | Description     |
| ------ | ---------------------------- | --------------- |
| POST   | `/review/{book_id}`          | Add Review      |
| GET    | `/get_all_reviews/{book_id}` | Get All Reviews |

---

# Project Structure

```bash
frontendfolder/
│
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage/
│   │   │   ├── LoginPage/
│   │   │   ├── RegisterPage/
│   │   │   ├── AddBook/
│   │   │   ├── BookDetailsPage/
│   │   │   ├── AddReview/
│   │   │   └── ViewAllReview/
│   │   └── ProtectedRoute/
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
backendfolder/
│
├── routes/
│   ├── auth_routes.py
│   ├── book_routes.py
│   └── review_routes.py
│
├── models/
│   ├── user_model.py
│   ├── book_model.py
│   └── review_model.py
│
├── utils/
│   └── jwt_handler.py
│
├── middleware/
│   └── logging_middleware.py
│
├── config/
│   └── db.py
│
├── main.py
└── requirements.txt
```

---

# Installation Guide

## Backend Setup

### Step 1: Create Virtual Environment

```bash
python -m venv venv
```

### Step 2: Activate Virtual Environment

```bash
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run Backend Server

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

### Step 1: Install Packages

```bash
npm install
```

### Step 2: Start Frontend Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# JWT Authentication Flow

1. User logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Frontend sends token using Authorization header
5. Backend validates token for protected routes

Example:

```javascript
Authorization: Bearer token
```

---

# Frontend Features

## Home Page

* Displays all books
* Displays average ratings
* View details button

## Book Details Page

* Displays full book details
* Displays all reviews
* Add review functionality

## Protected Routes

Users must log in before accessing:

* Home Page
* Add Book Page
* Book Details Page
* Add Review Functionality

---

# Deployment

## Frontend Deployment

Frontend deployed using:

* Vercel

Build command:

```bash
npm run build
```

## Backend Deployment

Backend deployed using:

* Render

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

## Database Hosting

* Railway MySQL

---

# Future Improvements

* Search Books
* Filter By Genre
* Edit Reviews
* Delete Reviews
* User Profile Page
* Dark Mode
* Pagination
* Book Cover Upload

---

# Author

Developed by Venkeyy
