# Carelink Hospital Portal

A comprehensive hospital management system built with Next.js, featuring role-based authentication, user management, and a responsive design.

## 🏥 Project Overview

This hospital portal provides a complete solution for managing hospital operations with different access levels for administrators, doctors, and patients.

## ✨ Features Completed

### 1. Landing Page
- Modern, responsive design
- Hero, Services, About, and Contact sections
- "Book Appointment" button redirects to signup for new users
- Professional navigation

### 2. Authentication System
- Email/password login form
- Role-based signup page with account creation
- Role-based redirection:
  - **Admin** → Admin Dashboard (User & Appointment Management)
  - **Doctor** → Doctor Page (Schedule & Patient Overview)
  - **User** → User Page (Appointment Booking & Health Records)
- Database-driven authentication
- Secure logout functionality (clears session/localStorage)
- Seamless registration → login → dashboard flow

### 3. Admin Panel - Complete CRUD Operations
- Add, view, edit, and delete users
- User schema includes all required fields:
  - Full Name (First Name + Last Name)
  - Email
  - Phone Number
  - Role (User, Doctor, Admin)
  - Gender (Male, Female, Other)
  - Address
  - Appointment Time
  - Doctor Assignment

### 4. Doctor Dashboard
- View all appointments assigned to the logged-in doctor
- See today's schedule and all patient appointments
- Access patient information and appointment details

### 5. Patient Dashboard
- Book appointments with doctors
- View appointment history
- See assigned doctor and appointment details

### 6. Appointment System
- Full CRUD with conflict detection
- Real-time APIs: RESTful endpoints for all operations
- Data validation and error handling
- Persistent appointment storage in MongoDB

### 7. UI/UX Excellence
- Clean, modern design
- Fully responsive layout (mobile, tablet, desktop)
- Tailwind CSS for consistent styling
- Professional color schemes for each role
- Intuitive navigation and user feedback

### 8. Database Integration
- MongoDB with Mongoose ODM
- User and Appointment schemas
- Environment variable for MongoDB connection (`MONGODB_URI`)

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom JWT-like implementation (localStorage for session)
- **Styling**: Tailwind CSS
- **Deployment Ready**: Vercel-optimized

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hospital-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/hospital-portal
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser


### New User Registration:
- **Signup Page**: `/signup` - Create new accounts with role selection
- **Role Options**: User (Patient), Doctor, Admin
- **Auto-redirect**: After successful signup → Login page → Role-based dashboard


## 📱 Features Showcase

### Landing Page
- Professional hospital homepage
- Clear navigation to staff login
- Responsive design for all devices

### Admin Dashboard
- Real-time user statistics
- Complete CRUD operations
- Advanced form with all required fields
- Doctor assignment functionality
- Appointment time scheduling

### Role-Based Access
- Secure login system
- Automatic redirection based on role
- Protected routes for each user type

### Database Integration
- MongoDB for data persistence
- Mongoose for schema validation
- RESTful API endpoints
- Error handling and validation

## 🎯 Task Requirements

| Requirement | Status | Description |
|------------|--------|-------------|
| Landing Page | ✅ | Hero, Services, About, Contact sections |
| Login System | ✅ | Email/password with role-based routing |
| Admin CRUD | ✅ | Complete Create, Read, Update, Delete |
| User Schema | ✅ | All required fields implemented |
| Doctor Data | ✅ | 6 doctors with full information |
| Role Routing | ✅ | Admin, Doctor, User dashboards |
| MongoDB Integration | ✅ | Mongoose ODM with validation |
| Responsive Design | ✅ | Mobile-first Tailwind CSS |
| Clean Code | ✅ | Modular components and clear structure |

## 🏆 Bonus Features Implemented

-  Clean, modular code structure
-  Responsive UI/UX design
-  MongoDB integration with Mongoose
-  Role-based access control
-  Modern Next.js 14 with App Router
-  Professional navigation system
-  Comprehensive error handling

## 👨‍💻 Developer Notes

This project demonstrates:
- Full-stack Next.js development
- Database design and integration
- Authentication and authorization
- Responsive web design
- Clean code practices
- Professional UI/UX design

## 🚀 Deployment

This project is **deployed on Vercel**:  
👉 [https://hospital-portal-seven.vercel.app/](https://hospital-portal-seven.vercel.app/)

### Admin Login (Demo)
- **Email:** admin@hospital.com
- **Password:** 111111

### Notes for Deployment
- The app is fully cloud-based and uses **MongoDB Atlas** (not local MongoDB).
- Environment variable `MONGODB_URI` is set in the Vercel dashboard.
- No Docker or manual server setup required—just push to GitHub and connect to Vercel.

---

**To deploy your own version:**
1. Fork or clone this repo.
2. Push to your own GitHub.
3. Import to [Vercel](https://vercel.com/import).
4. Set your `MONGODB_URI` (Atlas connection string) in Vercel Project Settings.
5. Deploy!

---

Enjoy using Carelink Hospital Portal!
