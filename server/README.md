# Music App - Backend Documentation

## Overview
The backend of the Music App is developed using **Node.js and Express.js**, providing RESTful API endpoints to manage user authentication, music files, playlists, and admin functionalities. The backend interacts with a MongoDB database and integrates Cloudinary for file storage.

---

## Technologies Used

- **Node.js**: JavaScript runtime for backend logic.
- **Express.js**: Web framework to handle routing and API requests.
- **MongoDB**: NoSQL database to store user and music data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **JWT (jsonwebtoken)**: Authentication mechanism.
- **Bcrypt.js**: Password hashing for security.
- **Cloudinary**: Cloud storage for music file uploads.
- **Dotenv**: Managing environment variables securely.

---

## Project Structure

```
server/
│-- config/
│   └── dbConfig.js
│-- middlewares/
│   └── authMiddleware.js
│-- models/
│   ├── userModel.js
│   ├── songModel.js
│-- routes/
│   ├── userRoutes.js
│   ├── songsRoutes.js
│   ├── adminRoutes.js
│-- controllers/
│   ├── userController.js
│   ├── songController.js
│-- index.js
│-- .env
│-- package.json
```

### Explanation
- **config/**: Database connection settings.
- **middlewares/**: Middleware functions such as authentication.
- **models/**: Mongoose schemas for users and songs.
- **routes/**: API endpoints for users, songs, and admin functionalities.
- **controllers/**: Business logic for API requests.
- **index.js**: Entry point of the backend application.

---

## API Endpoints (OpenAPI Style)

| Endpoint          | Method | Description                        | Auth Required |
|------------------|--------|----------------------------------|---------------|
| `/api/users/register` | POST   | User registration                  | No            |
| `/api/users/login`    | POST   | User login                          | No            |
| `/api/users/get-user-data` | POST   | Fetch logged-in user data          | Yes           |
| `/api/songs/get-all-songs` | POST   | Retrieve all songs                  | Yes           |
| `/api/songs/add-playlist`  | POST   | Add a playlist                      | Yes           |
| `/api/songs/update-playlist` | POST | Update an existing playlist         | Yes           |
| `/api/songs/delete-playlist` | POST | Delete a playlist                   | Yes           |
| `/api/admin/add-song`   | POST   | Upload a song                        | Yes           |
| `/api/admin/edit-song`  | POST   | Edit song details                    | Yes           |

---

## Core Concepts and Their Usage

### Authentication (JWT)
- **Used In:** Securing user routes and authorization.
- **Why:** Provides secure stateless authentication.
- **How:**
  - Users sign in and receive a JWT token.
  - Middleware verifies the token before allowing access.
  
### File Upload (Cloudinary)
- **Used In:** Uploading music files.
- **Why:** Provides scalable storage and URL retrieval.

### Error Handling
- **Used In:** Controllers to manage unexpected issues.
- **Why:** Ensures a smooth user experience with descriptive error messages.

---

## Learning Outcomes

### Backend API Development
- **Learned:** Building RESTful API endpoints with Express.js.
- **Applied In:** User authentication, music management.

### Database Integration
- **Learned:** Using Mongoose to interact with MongoDB.
- **Applied In:** Storing and querying user and music data.

### Authentication & Security
- **Learned:** JWT-based authentication with secure password storage.
- **Applied In:** User registration and login processes.

---

## Visual Storytelling
Imagine our backend as the engine of a music streaming service. Express.js acts as the highway, directing data to different destinations, while MongoDB serves as the storage room holding user details and music files securely. JWT is like a VIP pass that allows users to enter their personalized music world, and Cloudinary works as an external storage unit for storing valuable music files.

Together, these components provide a seamless, secure, and scalable music streaming experience.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/KAMRANKHANALWI/music-world.git
   ```
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Configure environment variables:
   ```
   MONGO_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

---

## Author
Developed by Kamran Khan Alwi.

