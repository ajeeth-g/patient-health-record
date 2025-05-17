# Patient Health Record Dashboard

A full-stack web application that enables clinic staff to manage patient health records efficiently.  
Built with React (frontend), Node.js + Express (backend), and MongoDB for data storage.

---

## Features

- User registration and login with JWT authentication
- Add new patient records with fields: Patient Name, Age, Gender, Diagnosis, Prescription Notes
- View all patient records in a dashboard
- Edit and delete patient records
- Search and filter records by patient name or diagnosis
- Basic form validation on inputs
- Responsive and clean UI built with Material UI

---

## Technologies Used

- **Frontend:** React, Material UI, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt
- **Database:** MongoDB (Atlas or local)
- **Authentication:** JSON Web Tokens (JWT)

---

## Project Structure

patient-health-record/
├── client/ # React frontend source code
└── server/ # Node.js + Express backend source code

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed locally

### Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/patient-health-record.git
   cd patient-health-record
   ```

cd server
npm install

cd ../client
npm install

cd server
npm start

cd ../client
npm start
