# Noteflow 📝

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, full-stack note-taking application built with the MERN stack, TypeScript, and Tailwind CSS.**

Noteflow empowers users to create, organize, and manage their notes seamlessly with a clean, intuitive interface and robust backend architecture. Whether you're capturing quick thoughts, organizing meeting notes, or building a personal knowledge base, Noteflow provides the tools you need to stay productive.

---

## ✨ Features

- 🎨 **User-friendly interface** with Tailwind CSS styling
- 📌 **Create, Read, Update, Delete (CRUD)** operations for notes
- 🔐 **Secure user authentication & authorization** 
- 📱 **Responsive design** (works across devices)
- ⚡ **Fast and optimized API** using Node.js & Express
- 🗄️ **Persistent data storage** with MongoDB
- 🔍 **Search and filter** notes functionality
- 🏷️ **Tag-based organization** for better note management
- 🌙 **Modern UI/UX** with clean design patterns

---

## 🛠️ Tech Stack

### Frontend
- **React** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB ODM for data modeling
- **JWT** - JSON Web Tokens for authentication

---

## 📂 Project Structure

```
Noteflow/
├── backend/                    # Backend Node.js application
│   ├── src/                   # Source code
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware functions
│   │   ├── models/           # MongoDB/Mongoose models
│   │   ├── routes/           # API route definitions
│   │   └── utils/            # Backend utility functions
│   ├── .gitignore            # Git ignore file for backend
│   ├── app.js               # Express app configuration
│   ├── index.js             # Server entry point
│   ├── package-lock.json    # Dependency lock file
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript configuration
├── frontend/                  # Frontend React application
│   ├── public/               # Static assets
│   ├── src/                 # React source code
│   ├── .gitignore           # Git ignore file for frontend
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html           # HTML template
│   ├── package-lock.json    # Dependency lock file
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── tsconfig.json        # TypeScript configuration
│   ├── tsconfig.node.json   # Node-specific TS config
│   ├── vercell.json         # Vercel deployment config
│   └── vite.config.ts       # Vite configuration
├── package.json             # Root package.json
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/heetnandu01/Noteflow.git
   cd Noteflow
   ```

2. **Install dependencies**

   **For server (backend):**
   ```bash
   cd backend
   npm install
   ```

   **For client (frontend):**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the `backend/` folder and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

   **Example `.env` file:**
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/noteflow
   # For MongoDB Atlas use:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/noteflow

   # JWT Configuration
   JWT_SECRET=your_super_secure_jwt_secret_here

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Run the project**

   **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - **Frontend:** `http://localhost:5173` (Vite default)
   - **Backend API:** `http://localhost:5000`

---

## 📖 Usage

### Getting Started with Noteflow

1. **Authentication**
   - Register a new account or sign in with existing credentials
   - Secure JWT-based authentication ensures your notes are private

2. **Creating & Managing Notes**
   - **Create:** Click "New Note" to add a new note with title and content
   - **Edit:** Click on any note to modify its content
   - **Delete:** Remove unwanted notes with the delete button
   - **Search:** Use the search functionality to find specific notes
   - **Organize:** Add tags to categorize your notes

3. **Features**
   - Real-time note synchronization
   - Responsive design works on all devices
   - Clean, modern interface for distraction-free writing

---

## 🔧 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Notes Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/notes` | Get all user notes | Yes |
| GET | `/api/notes/:id` | Get specific note | Yes |
| POST | `/api/notes` | Create new note | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

### Example API Request

```javascript
// Create a new note
const createNote = async (noteData) => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      title: 'My New Note',
      content: 'This is the content of my note',
      tags: ['work', 'important']
    })
  });
  
  return await response.json();
};
```

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Prepare for deployment:**
   - Ensure all environment variables are set
   - Update `MONGO_URI` to production database
   - Set `NODE_ENV=production`

2. **Deploy backend:**
   - Connect your GitHub repo to your hosting platform
   - Set environment variables in the platform dashboard
   - Deploy from the `backend` folder

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy:**
   - Upload the `dist` folder to your hosting platform
   - Update API endpoints to point to production backend
   - Configure environment variables if needed

### Environment Variables for Production

```env
# Production Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/noteflow-prod

# Security
JWT_SECRET=your_production_jwt_secret_key_here

# Server Configuration
NODE_ENV=production
PORT=5000

# CORS Configuration
CLIENT_URL=https://your-domain.com
```

---

## 🧪 Testing

```bash
# Test backend
cd backend
npm test

# Test frontend
cd frontend
npm test

# Run linting
npm run lint
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📋 Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run lint       # Run ESLint
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm test           # Run tests
```

---

## 🔧 Configuration Files

- **Backend:**
  - `tsconfig.json` - TypeScript configuration
  - `package.json` - Dependencies and scripts
  - `.gitignore` - Files to ignore in Git

- **Frontend:**
  - `vite.config.ts` - Vite build configuration
  - `tailwind.config.js` - Tailwind CSS configuration
  - `tsconfig.json` - TypeScript configuration
  - `eslint.config.js` - ESLint rules

---

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Issues:**
   - Check if MongoDB is running locally
   - Verify connection string in `.env` file
   - Ensure network access if using MongoDB Atlas

2. **Port Already in Use:**
   - Change PORT in `.env` file
   - Kill existing processes: `npx kill-port 5000`

3. **CORS Errors:**
   - Check if backend URL is correct in frontend
   - Ensure CORS is properly configured in backend

4. **Build Errors:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run type-check`

---

---

*Built with ❤️ by [Heet Nandu](https://github.com/heetnandu01)*
