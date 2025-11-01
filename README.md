# 🧑‍💻 Joineazy Dashboard

The **Joineazy Dashboard** is a modern **React + Vite** web application that enables **admins** to manage assignments and track student submissions, while **students** can easily view and submit their work.  
It uses **LocalStorage** for persistence and supports **Docker** for seamless deployment.

---

## ⚙️ Setup & Installation

### 🧱 Step 1: Clone the Repository
git clone https://github.com/<your-username>/joineazy-dashboard.git
cd joineazy-dashboard

### 🧱 Step 2: Install Dependencies
npm install

### 🧱 Step 3: Run the App Locally
npm run dev

Then open your browser and visit:
👉 http://localhost:5173


## 🐳 Docker Setup (Build & Run)

### 🧱 Step 1: Build the Docker Image
docker build -t joineazy-dashboard .

### 🧱 Step 2: Run the Container
docker run -d -p 3000:80 joineazy-dashboard


## 🗂 Folder Structure
joineazy-dashboard/
│
├── public/                         # Static assets
│
├── src/
│   ├── assets/                     # Icons and images
│   ├── components/                 # Core UI components
│   │   ├── AdminDashboard.jsx      # Admin main dashboard
│   │   ├── StudentDashboard.jsx    # Student main dashboard
│   │   └── AssignmentCard.jsx      # Reusable assignment card
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   └── Signup.jsx              # Signup page
│   ├── App.jsx                     # Router setup
│   ├── main.jsx                    # Root entry point
│   ├── App.css                     # Global styles
│   └── index.css                   # Tailwind base CSS
│
├── Dockerfile                      # Docker configuration
├── .dockerignore                   # Files to ignore in Docker build
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind setup
└── README.md                       # Project documentation


## 🧩 Features

### 👨‍🏫 Admin Dashboard
- Create, edit, and delete assignments  
- View submission status for each student  
- Hover or click to see which students have submitted (✅) or not (❌)  
- Visual progress bars for submission percentage  

### 🎓 Student Dashboard
- View available assignments  
- Submit assignments via Google Drive link  
- Track submission status in real-time  

### 🧠 General
- LocalStorage-based data persistence  
- Simple name-based signup/login  
- Fully responsive UI (Tailwind CSS)  
- Dockerized for quick setup and deployment  


```bash