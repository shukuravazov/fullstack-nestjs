# Event Management System

Welcome to the Event Management System! This project aims to provide a platform for managing events and locations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Scope](#project-scope)
  - [What's Included](#whats-included)
  - [Docker Configuration](#docker-configuration)
  - [What's Not Included](#whats-not-included)

## Features

- Create, edit, and delete events.
- Create, edit, and delete locations.
- Manage event locations.
- View event details and locations.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose (optional, for containerized development)

### Setup

1. **Database Setup**: Start the database using Docker:

   ```bash
   docker-compose up -d --build
   ```

### Installation

1. Clone this repository:

```bash
    https://github.com/shukuravazov/fullstack-event-management.git
```

2. Backend Setup:

   ```bash
          cd server
          npm install
          npm start
   ```

3. Frontend Setup:
   ```bash
          cd client
          npm install
          npm run serve
   ```

Once the application is set up and running, you can access the following:

- Server: The backend API server will be accessible at:

  ```bash
         http://localhost:8000
  ```

- Frontend: The Vue.js frontend development server will be accessible at:
  ```bash
          http://localhost:8080
  ```

## Usage

Access the application in your web browser by visiting http://localhost:8080.

## Project Scope

This Event Management System project aims to provide basic functionalities for managing events and locations. The following features have been implemented:

- Create, edit, and delete events.
- Create, edit, and delete locations.
- Manage event locations.
- View event details and locations.

The project includes a Vue.js frontend and a NestJS backend connected to a PostgreSQL database.

### What's Included

- Backend API for CRUD operations on events and locations, using PostgreSQL as the database.
- Real-time communication through Socket.IO to provide instant updates.
- Frontend interface for user interaction and management of events and locations.
- Docker configuration for easy development setup.
- Unit tests for some frontend components.

### Docker Configuration

While the project includes Docker, it's important to note that the Docker setup is not as described in the initial requirements. The provided Docker setup is focused on individual components rather than starting the entire project. You can find Dockerfiles in the respective directories of the backend and frontend. To run the project using Docker, you may need to adjust the Docker setup to match your requirements.

### What's Not Included

- Docker configuration to start the whole project.
- Unit tests and extensive testing suites.
- Comprehensive data validation and error handling. There is no implementation of validations and error handlers in both the backend and frontend.
- Comprehensive testing suites. While the project does include unit tests for specific frontend components, comprehensive testing coverage for all features is not present.
- Swagger documentation. The project does not utilize Swagger for API documentation.
- Queues for working with message queues using Redis. The project does not include queue-based functionality.
