# Journal App

A full-stack Journal Application built with Spring Boot and React.

## Technologies Used

### Backend
- **Java 8**
- **Spring Boot 2.7.16** (Web, Data MongoDB, Security, Actuator, Mail, Data Redis)
- **Spring Security & JWT** for secure authentication
- **MongoDB** as the primary database
- **Redis** for caching
- **Kafka** for message queuing
- **Lombok** to reduce boilerplate code
- **Springdoc OpenAPI / Swagger UI** for API documentation

### Frontend
- **React 19**
- **Vite** for fast, modern builds
- **React Router DOM** for client-side routing
- **Axios** for API requests

## Project Structure
- `/backend`: The Spring Boot Java application handling APIs, database interactions, security, caching, and message brokering.
- `/frontend`: The React single-page application providing a modern, responsive user interface.

## Prerequisites
- Java Development Kit (JDK) 8
- Node.js (and npm)
- MongoDB
- Redis
- Kafka

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your properties (e.g., MongoDB URI, Redis host, Kafka servers) in the `src/main/resources/application.yml` file.
3. Build and run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server runs on `http://localhost:8089/journal`.
   Swagger UI is available at `http://localhost:8089/journal/swagger-ui.html`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

## Features
- **User Authentication:** Secure login and registration using JSON Web Tokens (JWT).
- **CRUD Operations:** Create, Read, Update, and Delete journal entries.
- **RESTful API:** Clean backend endpoints.
- **Responsive UI:** Built with modern React features.
- **Caching & Queues:** Advanced data handling with Redis and Kafka integrations.
