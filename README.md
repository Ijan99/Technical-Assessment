# GlobalTNA - Mini Service Request Board(Full-Stack App)

---

## Overview
A simple full-stack web application where users can create and manage service requests like plumbing, electrical, painting, etc.

---

## Tech Stack

- Frontend: Next.js
- Backend: Node.js + Express
- Database: MongoDB
- Styling: Tailwind CSS

---

## Project Structure

frontend/
backend/

---

## Setup Instructions

## Clone Repository

git clone -  https://github.com/Ijan99/Technical-Assessment.git

---

## Backend Setup

cd backend
npm install

---

## Create `.env` file inside backend folder:

PORT=5000
MONGO_URI=mongodb+srv://gaweshada_db_user:7Gbl8ONS5NRTMD4o@cluster0.eorcmd8.mongodb.net/?appName=Cluster0

---

### Run backend:

npm run dev

---

## Backend runs on:

http://localhost:5000

---

## Frontend Setup

cd frontend
npm install

---

### Run frontend:

npm run dev

---

## Frontend runs on:

http://localhost:3000

---

## API Endpoints

- GET /api/jobs               > Get all jobs
- GET /api/jobs/:id           > Get job details
- POST /api/jobs              > Create job
- PATCH /api/jobs/:id         > Update status
- DELETE /api/jobs/:id        > Delete job

---

## Features

- Create service requests
- View all requests
- Browse jobs
- Search by keyword
- Filter requests by category
- Update request status
- Delete requests
- Full-stack architecture

---

## Bonus Features

* Unit tests (Jest + Supertest)
* MongoDB integration
* Search

## Author
Ijan Gaweshada Panditharathne