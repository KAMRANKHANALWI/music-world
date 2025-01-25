# 🎵 **Music World** ([Listen](https://listen-music-world.onrender.com/))

## Overview
Music App is a full-stack web application designed for users to upload, manage, and stream their favorite music. The project consists of a **React.js frontend** and a **Node.js Express backend**, with data stored in **MongoDB** and media files hosted via **Cloudinary**.

---

## Features

- **User Authentication:** Secure JWT-based login and registration.
- **Music Upload & Management:** Upload songs, create playlists, and manage collections.
- **Streaming Service:** Play songs with an interactive UI.
- **Admin Dashboard:** Manage songs and user playlists.
- **Responsive Design:** Fully optimized UI with Tailwind CSS.

---

## Technologies Used

### Frontend
- **React.js** – Component-based UI development.
- **Redux Toolkit** – State management.
- **React Router** – Client-side routing.
- **Tailwind CSS** – Utility-first CSS framework.
- **Axios** – API communication.

### Backend
- **Node.js** – Backend server runtime.
- **Express.js** – API routing and middleware.
- **MongoDB** – NoSQL database.
- **Mongoose** – ODM for MongoDB.
- **Cloudinary** – File storage and management.
- **JWT** – User authentication.

---

## Project Structure

```
Music-World/
│-- client/               # Frontend code (React.js)
│-- server/               # Backend code (Node.js + Express)
│-- README.md             # Documentation       
```

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed on your system:
- Node.js
- MongoDB
- Git

### Steps to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KAMRANKHANALWI/music-world.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Music-World
   ```

3. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

4. **Set environment variables:**
   Create `.env` files in both `server/` and `client/` directories and configure the necessary variables.

5. **Run the backend server:**
   ```bash
   cd server
   npm start
   ```

6. **Run the frontend:**
   ```bash
   cd client
   npm start
   ```

7. **Access the application:**
   Open `http://localhost:3000` in your web browser.

---

## API Endpoints (Backend)

| Endpoint               | Method | Description                   |
|-----------------------|--------|-------------------------------|
| `/api/users/register`  | POST   | User registration             |
| `/api/users/login`     | POST   | User login                     |
| `/api/songs/get-all`   | POST   | Retrieve all songs             |
| `/api/songs/add`       | POST   | Add a new song                  |
| `/api/admin/manage`    | POST   | Admin functionalities           |

---

## Learning Outcomes

- **State Management:** Utilizing Redux Toolkit to handle global state.
- **Authentication:** Implementing secure authentication using JWT.
- **API Integration:** Communication between frontend and backend.
- **File Management:** Cloudinary for media file uploads.

---

## Visual Storytelling
Imagine the Music App as a digital library where:
- **React.js** is the librarian, helping users navigate the app.
- **Redux** is the catalog system, keeping track of everything.
- **Node.js & Express.js** serve as the backend, managing all operations.
- **MongoDB** acts as a storage room for data.
- **Cloudinary** is the cloud storage vault for media files.

Together, they create a seamless music streaming experience.

---

## Author
Developed by Kamran Khan Alwi.



