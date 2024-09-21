# 🎵 Music World

Live Project: [Music World](https://listen-music-world.onrender.com/)

## Overview
**Music World** is a fully-featured music player app developed using the **MERN stack**. It allows users to enjoy their favorite tracks with advanced features such as user authentication, playlist management, and full audio controls. Admins can manage songs and playlists through an intuitive admin panel. The application is deployed on Render for seamless accessibility.

## Features
- **User Authentication**:
  - Users can register and log in to their accounts securely.
  - Each user can create and manage their playlists of favorite songs.

- **Playlist Management**: Users can create, manage, and delete playlists easily.

- **Audio Controls**:
  - Play, Pause, Next, and Previous song.
  - Shuffle mode to enjoy random playback.
  - Volume control for a customized listening experience.

- **Admin Panel**:
  - Full app management capabilities.
  - Admins can add, edit, and delete songs.
  - Upload songs with ease using **Multer** and **Cloudinary** for file storage.

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **User Authentication**: JSON Web Tokens (JWT)
- **File Uploading**: Multer, Cloudinary
- **Deployment**: Render

## Installation and Setup
To get started with the project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KAMRANKHANALWI/music-world.git
   cd music-world
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory with the necessary environment variables:
     ```env
     PORT=4000
     MONGODB_URI=<your_mongodb_uri>
     CLOUDINARY_NAME=<your_cloudinary_name>
     CLOUDINARY_API_KEY=<your_cloudinary_api_key>
     CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
     JWT_SECRET=<your_jwt_secret>
     ```
   - Run the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend` directory with the following:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:4000
     ```
   - Run the frontend server:
     ```bash
     npm start

