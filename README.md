# Airtribe Course Management System

Design database and APIs for application-based courses on Airtribe.


## Database Relations

- There are multiple instructors on Airtribe.
- Every instructor can start multiple courses.
- Multiple learners can apply for a course using an application form (Leads).
- Instructors can add comments against every lead.

## MongoDB Database Design

The database is designed using MongoDB, with collections for instructors, courses, leads, and comments. Each collection is structured to maintain relationships and ensure data integrity.

## Node.js Server and APIs

To implement the server and APIs, you can use Node.js with your favorite framework (e.g., Express.js). Below are the required APIs:

1. **Create Course API**: Endpoint to create a new course.
2. **Update Course Details API**: Endpoint to update course details such as name, max seats, start date, etc.
3. **Course Registration API**: Endpoint for users to apply for a course by providing their name, email, phone number, and LinkedIn profile.
4. **Lead Update API**: Endpoint for instructors to change the status of a lead (Accept / Reject / Waitlist).
5. **Lead Search API**: Endpoint for instructors to search leads by name or email.
6. **Add Comment API**: Endpoint for instructors to add comments against a lead.

Refer to the implementation details and code examples in your favorite Node.js framework for each API.

## Table of Contents

- [Introduction](#introduction)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Introduction

Welcome to the Airtribe Course Management System! This application allows instructors to manage courses, accept registrations, and interact with potential learners effectively.


## API Endpoints

The application provides the following API endpoints:

- **Instructor Routes**: SignUp, Login
- **Course Routes**: Create, Update, GetAll
- **Lead Routes**: Register, UpdateStatus, Search
- **Comment Routes**: Create

Refer to the API documentation in the codebase for detailed usage instructions.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication


## Getting Started

To run this application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/saurabhm02/airtribe-course-management.git`
2. Navigate to the project directory: `cd airtribe-course-management`
3. Install dependencies: `npm install`
4. Set up your MongoDB database and update the database configuration.
5. Start the server: `npm start`
6. The server will be running at `http://localhost:3000`.
