# 🧑‍💻 Joineazy Dashboard

The **Joineazy Dashboard** is a modern **React + Vite** web application that enables **admins** to manage assignments and track student submissions, while **students** can easily view and submit their work.  
It uses **LocalStorage** for persistence and supports **Docker** for seamless deployment.

---

## ⚙️ Setup & Installation

### 🧱 Step 1: Clone the Repository
git clone https://github.com/<your-username>/joineazy-dashboard.git
cd joineazy-dashboard

### ⚙️ Step 2: Install Dependencies
npm install

### ▶️ Step 3: Run the App Locally
npm run dev

Then open your browser and visit:
👉 http://localhost:5173


## 🐳 Docker Setup (Build & Run)

### 🧰 Step 1: Build the Docker Image
docker build -t joineazy-dashboard .

### 🚀 Step 2: Run the Container
docker run -d -p 3000:80 joineazy-frontend


## 🗂 Folder Structure
joineazy-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── assets/                     # Icons and images
│   │   ├── components/                 # Core UI components
│   │   │   ├── admin/                  # Admin-specific components
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AssignmentCard.jsx
│   │   │   │   ├── CourseAssignmentsPage.jsx
│   │   │   │   └── CourseCard.jsx
│   │   │   └── students/               # Student-specific components
│   │   │       ├── CourseAssignments.jsx
│   │   │       ├── CoursesList.jsx
│   │   │       └── StudentDashboard.jsx
│   │   ├── pages/                      # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx                     # Router setup
│   │   ├── main.jsx                    # Root entry point
│   │   ├── App.css                     # Global styles
│   │   └── index.css                   # Tailwind base CSS
│   │
│   ├── Dockerfile                      # Docker configuration
│   ├── .dockerignore                   # Docker ignore file
│   ├── package.json                    # Dependencies and scripts
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind setup
│   ├── index.html                      # Entry HTML
│   └── README.md                       # Project documentation
│
└── .git/                               # Git repository



## 🧩 Features

### 👨‍🏫 Admin Dashboard
- Create, edit, and delete assignments  
- Separate management for Individual and Group assignments
- View submission status for each student  
- Assignments can only be acknowledged by group leaders
- Hover or click to see which students have submitted (✅) or not (❌)  
- Visual progress bars for submission percentage  

### 🎓 Student Dashboard
- View available assignments  
- Submit assignments via Google Drive link  
- Track submission status in real-time  
- Automatic group acknowledgment for leader-submitted tasks

### 🧠 General
- LocalStorage-based data persistence  
- Simple name-based signup/login  
- Fully responsive UI (Tailwind CSS)  
- Dockerized for quick setup and deployment  


```bash
