# 👮‍♂️ CivicTrust – Police & Citizen Connect

CivicTrust is a platform designed to enhance communication and build trust between citizens and the police. It offers dedicated dashboards for both sides, allowing users to share updates, upload evidence, track complaints, and stay informed. The goal is to foster safer communities and encourage cooperation through transparent interactions.

---

## 🛡️ Main Features

- 📝 **Complaint Handling**  
  Register and track complaints online. Option to submit anonymously.

- 🔐 **Secure Evidence Upload**  
  Share documents, photos, or videos safely and securely.

- 🧾 **Report Access**  
  Download verified police reports directly from the platform.

- 📍 **Status Updates**  
  Get real-time alerts and progress reports on your case.

- 🗺️ **Map Support**  
  Find nearby police stations on an interactive map interface.

- 🚨 **Anonymous Reporting**  
  Report suspicious activity without revealing personal details.

- 🤝 **Community Hub**  
  Engage in live chats, share safety tips, and stay updated with announcements.

---

## 🚀 Tech Stack

### 🔧 Frontend
- Next.js  
- React 19  
- Tailwind CSS  
- Framer Motion  
- ShadCN UI  
- React Leaflet + Leaflet  
- Socket.IO Client  
- html2pdf.js  
- React Webcam  

### 🧠 Backend
- Node.js  
- Express  
- Socket.IO  
- Cloudinary + Multer  

### 🗄️ Database
- MongoDB  

### 🔐 Authentication
- JWT  
- Bcrypt.js  

### 🌍 Other Tools
- Google Maps API  
- WebSockets  

---

## ⚠️ Current Challenges

- **Map Accuracy** – Google Maps API sometimes shows incorrect police station locations.  
- **Map Design** – Interface styling and marker visibility need improvement.

---

## 📌 Roadmap

✅ Improve live location tracking  
✅ Redesign the map interface for better user experience  
✅ Add multi-language support  
✅ Explore AI-driven safety alerts and predictive insights

---

## 💡 Mission

CivicTrust is not just a complaint reporting system—it’s a movement towards open communication, transparent policing, and safer neighborhoods.

---


## 📂 Project Structure
civictrust/ ├── backend/                       # Node.js + Express backend │   ├── config/                    # Database and Cloudinary configuration │   │   ├── cloudinary.js │   │   └── db.js │   ├── controllers/               # API request handlers │   │   ├── authController.js │   │   ├── complaintController.js │   │   ├── evidenceController.js │   │   └── reportController.js │   ├── middlewares/               # Middleware functions │   │   ├── authMiddleware.js │   │   ├── errorMiddleware.js │   │   └── uploadMiddleware.js │   ├── models/                    # MongoDB schemas │   │   ├── Complaint.js │   │   ├── Report.js │   │   └── User.js │   ├── routes/                    # API routes │   │   ├── authRoutes.js │   │   ├── complaintRoutes.js │   │   ├── evidenceRoutes.js │   │   └── reportRoutes.js │   ├── utils/                     # Utility functions │   │   ├── generateToken.js │   │   └── validators.js │   ├── server.js                  # Server entry point │   └── .env                       # Environment variables │ ├── frontend/                      # Next.js frontend │   ├── public/                    # Static assets │   │   └── assets/ │   ├── src/ │   │   ├── api/                   # API call functions │   │   │   └── api.js │   │   ├── components/            # UI components │   │   │   ├── Chat/ │   │   │   ├── ComplaintForm/ │   │   │   ├── MapView/ │   │   │   ├── Navbar/ │   │   │   ├── ReportCard/ │   │   │   └── Shared/ │   │   ├── contexts/              # Global state management │   │   │   └── AuthContext.js │   │   ├── hooks/                 # Custom React hooks │   │   │   └── useAuth.js │   │   ├── pages/                 # Next.js pages │   │   │   ├── _app.js │   │   │   ├── index.js │   │   │   ├── login.js │   │   │   ├── dashboard.js │   │   │   ├── complaint.js │   │   │   └── report.js │   │   ├── styles/                # Tailwind and global CSS │   │   │   └── globals.css │   │   └── utils/                 # Helper functions │   │       └── mapUtils.js │   ├── .env.local                 # Frontend environment variables │   ├── next.config.js │   ├── tailwind.config.js │   └── package.json │ ├── README.md                      # Project documentation ├── .gitignore └── package.json                   # Root dependencies

---

## 📌 Environment Variables

Create `.env` files in both `backend` and `frontend` folders.

### Backend `.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Frontend .env.local

NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api


---

🛠️ Installation Guide

Clone the repository

git clone https://github.com/your-username/civictrust.git

Navigate to the project folder

cd civictrust

Install dependencies for backend

cd backend
npm install

Install dependencies for frontend

cd ../frontend
npm install

Run the development servers

Backend

cd ../backend
npm run dev

Frontend

cd ../frontend
npm run dev

Access the application at http://localhost:3000.


---

🤝 Contribution

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

