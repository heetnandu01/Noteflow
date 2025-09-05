# Noteflow 📝

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

A modern, full-stack note-taking application built with the MERN stack, TypeScript, and Tailwind CSS. Create, organize, and manage your notes seamlessly with a clean UI and powerful backend support.

---

## ✨ Features

* 🎨 User-friendly interface with Tailwind CSS styling
* 📌 CRUD operations for notes
* 🔐 Secure user authentication & authorization
* 📱 Responsive design (works across devices)
* ⚡ Fast and optimized API using Node.js & Express
* 🗄️ Persistent data storage with MongoDB

---

## 🛠️ Tech Stack

**Frontend:** React + TypeScript + Tailwind CSS + Vite
**Backend:** Node.js + Express.js + MongoDB + Mongoose
**Authentication:** JWT

---

## 📂 Project Structure

```
Noteflow/
├── backend/                    
│   ├── src/                   
│   │   ├── controllers/       
│   │   ├── middleware/        
│   │   ├── models/           
│   │   ├── routes/           
│   │   └── utils/            
│   ├── app.js               
│   ├── index.js             
│   └── package.json         
├── frontend/                  
│   ├── src/                 
│   ├── index.html           
│   ├── package.json         
│   ├── tailwind.config.js   
│   └── vite.config.ts       
└── README.md               
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v14+)
* npm or yarn
* MongoDB (local or Atlas)

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
   cd ../frontend
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `backend/` folder with your **own credentials**:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   ⚠️ Do **not** commit `.env` to version control.

4. **Run the application**

   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (new terminal)
   cd ../frontend
   npm run dev
   ```

5. **Access the app**

   * Frontend: `http://localhost:5173`
   * Backend API: `http://localhost:5000`

---

## 🔧 API Endpoints

### Authentication

* `POST /api/auth/register` - Register new user
* `POST /api/auth/login` - User login

### Notes

* `GET /api/notes` - Get all user notes
* `POST /api/notes` - Create new note
* `PUT /api/notes/:id` - Update note
* `DELETE /api/notes/:id` - Delete note
