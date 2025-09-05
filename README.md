# Noteflow 📝

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, full-stack note-taking application built with the MERN stack, TypeScript, and Tailwind CSS. Create, organize, and manage your notes seamlessly with a clean UI and powerful backend support.

---

## ✨ Features

- 🎨 User-friendly interface with Tailwind CSS styling
- 📌 Create, Read, Update, Delete (CRUD) operations for notes
- 🔐 Secure user authentication & authorization 
- 📱 Responsive design (works across devices)
- ⚡ Fast and optimized API using Node.js & Express
- 🗄️ Persistent data storage with MongoDB

---

## 🛠️ Tech Stack

**Frontend:** React + TypeScript + Tailwind CSS + Vite  
**Backend:** Node.js + Express.js + MongoDB + Mongoose  
**Authentication:** JWT

---

## 📂 Project Structure

```
Noteflow/
├── backend/                    # Backend Node.js application
│   ├── src/                   
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   └── utils/            # Utility functions
│   ├── app.js               # Express app configuration
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
├── frontend/                  # Frontend React application
│   ├── src/                 # React source code
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.ts       # Vite configuration
└── README.md               # Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/heetnandu01/Noteflow.git
   cd Noteflow
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

3. **Environment Variables**
   
   Create `.env` in the `backend/` folder:
   ```env
   MONGO_URI=mongodb://localhost:27017/noteflow
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run the application**
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (new terminal)
   cd frontend
   npm run dev
   ```

5. **Access the app**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

---

