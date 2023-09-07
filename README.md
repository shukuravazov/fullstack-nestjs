# Event Management System

Welcome to the Event Management System! This project aims to provide a platform for managing events and locations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
- [Project Scope](#project-scope)
  - [What's Included](#whats-included)
  - [What's Not Included](#whats-not-included)

## Features

- Create, edit, and delete events.
- Create, edit, and delete locations.
- Manage event locations.
- View event details and locations.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose 

### Installation

 Clone this repository:

```bash
    https://github.com/shukuravazov/fullstack-event-management.git
```

### Setup

 **Start the app**: Start the application using Docker:

   ```bash
   docker-compose up --build
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


### What's Not Included

- Unit tests and extensive testing suites.
- Comprehensive data validation and error handling. There is no implementation of validations and error handlers in both the backend and frontend.
- Comprehensive testing suites. While the project does include unit tests for specific frontend components, comprehensive testing coverage for all features is not present.
- Swagger documentation. The project does not utilize Swagger for API documentation.
- Queues for working with message queues using Redis. The project does not include queue-based functionality.
