Project: Minimal DevOps Test Suite
Goal: Create a simple Monorepo project containing a React Frontend and a Spring Boot Backend to verify Docker Compose network connectivity (Nginx, MySQL, Redis).

1. Project Structure

Plaintext

my-devops-project/
├── backend/            # Spring Boot Project
├── frontend/           # React (Vite) Project
└── README.md           # Documentation (English)
2. Backend Specification (Spring Boot)

Tech Stack: Java 17, Spring Boot 3.x, Gradle (Groovy).

Dependencies: Spring Web, Spring Data JPA, MySQL Driver, Spring Data Redis, Lombok.

Configuration (application.yml):

Must use Environment Variables for sensitive data to match docker-compose.

DB Host: ${SPRING_DATASOURCE_URL} (Default: jdbc:mysql://mysql:3306/project_db...)

Redis Host: ${REDIS_HOST} (Default: localhost), Password: ${REDIS_PASSWORD}

Features:

Entity: AccessLog (id, timestamp, clientIp).

Redis: Maintain a visitorCount key.

API Endpoint (/api/test):

Increment visitorCount in Redis.

Save a new AccessLog to MySQL.

Return JSON: { "message": "Connection Successful", "visitorCount": <count>, "dbLogCount": <count> }

Health Check (/api/health): Return simple string "Backend is OK".

Dockerfile:

Base: openjdk:17-jdk-alpine.

Build artifact: build/libs/*.jar.

Expose: 8080.

3. Frontend Specification (React)

Tech Stack: React, Vite, Axios.

Features:

UI: A minimal card centered on the screen.

Elements:

Title: "DevOps Architecture Test"

Status Indicator: Shows "Loading...", "Connected (Green)", or "Error (Red)".

Data Display: Shows visitorCount and dbLogCount received from Backend.

Refresh Button: Manually triggers the API call.

Logic:

On mount, call GET /api/test.

(Note: Assume Nginx will proxy /api requests to the backend, so use relative path /api/test).

Dockerfile:

Stage 1 (Builder): Node.js image, run npm install and npm run build.

Stage 2 (Runner): Nginx alpine image. Copy build output to /usr/share/nginx/html.

Nginx Config: default config is fine for internal container.