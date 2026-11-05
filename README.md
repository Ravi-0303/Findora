# Findora – Campus Lost-and-Found Portal

Findora is a full-stack MERN application designed to help students report, discover, and recover lost and found items within a campus. It provides a centralized platform where students can report missing belongings, upload item images, browse found items, and submit claim requests. Administrators can review and manage claims to help return belongings to their rightful owners.

## Live Project

- **Frontend:** https://findora-website.onrender.com
- **Backend:** https://findora-portal.onrender.com
- **GitHub Repository:** https://github.com/Ravi-0303/Findora

## Features

### Student Features
- User registration and login.
- Secure authentication using JSON Web Tokens (JWT).
- Report lost items.
- Report found items.
- Upload item images.
- View available lost and found items.
- Search and browse reported items.
- View detailed item information.
- Submit claim requests with proof.
- Track personal claim requests.
- Edit and delete reported items.

### Admin Features
- Admin authentication and role-based access.
- View all claim requests.
- Review claim details and submitted proof.
- Approve or reject claim requests.
- Manage the claim approval process.
- Automatically update item status when a claim is approved.

### General Features
- Responsive user interface.
- Protected routes.
- Role-based authorization.
- REST API integration.
- MongoDB Atlas database.
- Cloud deployment using Render.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, bcryptjs |
| API Communication | Axios |
| Image Upload | Multer |
| Deployment | Render |
| Version Control | Git, GitHub |

## Project Structure

```text
Findora/
│
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── itemController.js
│   │   └── claimController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Claim.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   └── claimRoutes.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB Atlas account
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/Ravi-0303/Findora
```

Move into the project directory:

```bash
cd Findora
```

### 2. Backend Setup

Open the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
node server.js
```

Backend runs locally at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend runs locally at:

```text
http://localhost:5173
```

## Database Design

Findora uses MongoDB Atlas with three main collections.

### 1. Users Collection

Stores registered student and administrator details.

Fields:
- name
- email
- password
- role
- createdAt
- updatedAt

Passwords are hashed using bcryptjs before being stored in the database.

### 2. Items Collection

Stores information about lost and found items.

Fields:
- title
- description
- category
- status
- location
- date
- image
- reportedBy
- createdAt
- updatedAt

Item status can be:
- lost
- found
- claimed

### 3. Claims Collection

Stores claim requests submitted by students.

Fields:
- item
- claimedBy
- proof
- status
- createdAt
- updatedAt

Claim status can be:
- pending
- approved
- rejected

## API Endpoints

The backend provides REST APIs for users, items, and claims.

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user |

### Item APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/items` | Report an item |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

### Claim APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/claims` | Submit a claim request |
| GET | `/api/claims` | Get all claims (Admin) |
| GET | `/api/claims/myclaims` | Get personal claims |
| PUT | `/api/claims/:id` | Approve or reject a claim (Admin) |

Protected endpoints require a valid JWT token in the Authorization header.

## Authentication and Authorization

Findora implements secure authentication and role-based authorization.

1. A student registers using their name, email, and password.
2. The password is hashed using bcryptjs.
3. During login, the entered password is compared with the stored password hash.
4. A JWT token is generated after successful login.
5. The frontend stores the token and sends it with protected API requests.
6. Middleware verifies the token before allowing access to protected routes.
7. Admin middleware checks the user's role before allowing administrator operations.

## How the Application Works

1. Students register and log in to the portal.
2. Students report lost or found belongings.
3. Reported items are stored in MongoDB.
4. Students browse available items.
5. A student who identifies a found item as their belonging submits a claim request with proof.
6. The administrator reviews the submitted claim.
7. The administrator approves or rejects the request.
8. When a claim is approved, the item's status automatically changes to `claimed`.

## Testing

The following functionalities were tested:

- Student registration and login.
- Password hashing.
- JWT token generation and verification.
- Protected route access.
- Role-based access for students and administrators.
- Lost item reporting.
- Found item reporting.
- Item retrieval and display.
- Item update and deletion.
- Claim request submission.
- Admin claim approval and rejection.
- Automatic item status update after approval.
- MongoDB database operations.
- Frontend and backend deployment.
- Responsive interface testing.

## Deployment
The application is deployed using Render.

### Frontend Deployment

- Platform: Render Static Site
- Frontend URL: https://findora-website.onrender.com
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### Backend Deployment

- Platform: Render Web Service
- Backend URL: https://findora-portal.onrender.com
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`

### Database Deployment

MongoDB Atlas is used as the cloud database. The backend connects to the Atlas cluster through the `MONGO_URI` environment variable configured in Render.

## Future Enhancements

- Email notifications for claim updates.
- Advanced search and filtering.
- Image-based item matching.
- Cloud-based image storage.
- Improved admin analytics dashboard.
- Real-time notifications.
- Improved item recovery tracking.

## Project Purpose

The main purpose of Findora is to simplify the process of recovering lost belongings within a campus environment. By providing a centralized digital platform, it reduces the difficulty of finding lost items and makes communication between students and administrators easier.

## Conclusion

Findora provides a centralized and user-friendly campus lost-and-found management system using the MERN stack. It allows students to report and search for belongings while providing administrators with tools to manage claim requests. The project demonstrates full-stack web development, database management, authentication, REST API integration, testing, and cloud deployment.

---

**Project Name:** Findora – Campus Lost-and-Found Portal  
**Project Type:** MERN Stack Web Application  
**Domain:** Lost-and-Found Management System  
**Database:** MongoDB Atlas  
**Deployment Platform:** Render
