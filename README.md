
# 👮‍♂️ CivicTrust – Building Safer, Stronger Communities

**CivicTrust** is a modern platform designed to enhance cooperation between citizens and law enforcement agencies. By providing secure communication tools, transparent reporting channels, and interactive community features, CivicTrust empowers individuals to play an active role in public safety.

Through intuitive dashboards and real-time updates, CivicTrust ensures that people stay informed, report concerns, and collaborate with authorities—all while prioritizing privacy, trust, and accessibility.

---

## ✨ Key Features

### 📩 Seamless Complaint Reporting
Easily submit complaints through a user-friendly interface and track their progress in real-time without unnecessary hurdles.

### 🔒 Confidential Evidence Sharing
Upload photos, videos, and documents securely. Only authorized officers can access your evidence, keeping your data protected.

### 📂 Access Verified Reports
Download official police reports from your personal dashboard without the need for manual intervention.

### 📍 Find Nearby Assistance
An interactive map helps you locate police stations, emergency responders, and other support services with precision.

### 🚨 Report Without Revealing Identity
Use the anonymous reporting feature to raise concerns without fear of exposure.

### 📡 Live Tracking & Safety Alerts
Stay updated with notifications about your complaints, nearby incidents, and safety advisories from trusted sources.

### 🗣 Community Support Network
Join discussions, share experiences, and collaborate with fellow citizens and officers to enhance community safety.

---

## 🛠 Technology Stack

### Frontend
- **Next.js** – Fast and SEO-optimized interfaces
- **React 19** – Scalable component architecture
- **Tailwind CSS** – Clean and responsive styling
- **Framer Motion** – Elegant animations and transitions
- **ShadCN UI** – Pre-built UI components
- **React Leaflet + Leaflet** – Interactive and customizable maps
- **Socket.IO Client** – Real-time notifications and messaging
- **html2pdf.js** – Download reports as PDF documents
- **React Webcam** – Capture evidence directly from your device

### Backend
- **Node.js + Express** – RESTful APIs and server logic
- **Socket.IO** – Instant communication between users and officers
- **Cloudinary + Multer** – Secure file uploads and storage
- **MongoDB** – Reliable and scalable database
- **JWT + Bcrypt.js** – Authentication and password encryption
- **Google Maps API** – Accurate location and mapping services

---

## 📂 Project Structure

### Client

client/ ├── public/                  # Static files like images and icons ├── src/ │   ├── components/          # UI components such as forms, maps, etc. │   ├── contexts/            # State management for authentication │   ├── pages/               # Routing and page structures │   ├── services/            # API calls and socket connection setup │   ├── styles/              # Tailwind CSS styles │   └── utils/               # Utility functions and helpers

### Server

server/ ├── controllers/             # Handling API requests ├── middlewares/             # Authentication and error handling ├── models/                  # Database schemas ├── routes/                  # API endpoint definitions ├── utils/                   # Helper configurations like Cloudinary ├── socket/                  # WebSocket event handling ├── config/                  # Environment and database setup └── server.js                # Main server entry point

### Documentation

docs/ ├── API_SPEC.md              # API endpoints and usage guide ├── ARCHITECTURE_DIAGRAM.png # System architecture and database schema

---

## 🗺 Enhanced Map Features

✔ Live tracking of police stations and emergency units  
✔ Interactive markers with detailed information  
✔ Cluster markers for dense areas to avoid clutter  
✔ Route guidance from your location to nearby help centers  
✔ Filters based on distance, availability, and priority  
✔ Offline fallback options for slow or intermittent connections

---

## 🚀 Setup Guide

### Install the Frontend
```bash
cd client
npm install
npm run dev

Install the Backend

cd server
npm install
npm run dev

Configure Environment Variables

Client .env

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=http://localhost:5000

Server .env

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


---

📈 Roadmap

✔ Add role-based dashboards for officers and community leaders
✔ Integrate AI-driven threat detection and insights
✔ Push notifications and SMS alerts for emergencies
✔ Multilingual interface for wider reach
✔ Advanced analytics for crime and safety trends


---

🤝 How to Contribute

We encourage developers, safety advocates, and community leaders to contribute. Fork the project, report issues, or submit pull requests with improvements and new features.


---

Together, with CivicTrust, we can create safer and more connected communities where every voice matters.

---

Let me know if you want:
- The `LICENSE` file template included.
- API documentation formatted in Swagger or Postman.
- A sample contribution guide or issue template for GitHub.


