# Communication Spectrum Web Application

A full-stack web application designed to help users create, manage, customise, and share personalised communication supports.

The application provides a structured environment for creating visual and text-based communication resources, managing reusable templates, organising supports and schedules, and sharing resources with other users.

## Features

* **Communication Support Creation**

  * Create supports from scratch or from pre-made templates
  * Customise support titles, colours, text, images, and layout
  * Build multi-step communication resources
  * Add and manage visual elements

* **Templates**

  * Create reusable communication templates
  * Browse and select pre-made templates
  * Save and manage personalised templates
  * Share templates with other users

* **User Management**

  * User registration and authentication
  * Personal user profiles
  * Profile picture management
  * User settings and preferences
  * Manage shared resources and subscriptions

* **Scheduling**

  * Create daily schedules
  * Organise weekly calendars
  * Assign communication supports to scheduled activities

* **Image & Visual Support Tools**

  * Upload and manage images
  * Image cropping and editing
  * Gallery functionality
  * Custom visual support configuration

* **Sharing & Collaboration**

  * Share communication supports with other users
  * Manage shared templates
  * View and interact with shared resources

## Tech Stack

### Frontend

* React
* React Router
* Material UI
* Bootstrap
* Axios
* Day.js
* React Easy Crop
* React Draggable
* React Resizable

The frontend is organised into reusable components, pages, services, and utility modules.

### Backend

* Node.js
* Express
* PostgreSQL
* Redis
* JWT authentication
* bcrypt
* Jest
* Supertest
* ESLint

The backend exposes the application's server-side functionality and communicates with the PostgreSQL database and Redis service.

### Infrastructure

* Docker
* Docker Compose
* PostgreSQL
* Redis

Docker Compose is used to orchestrate the database, Redis, backend, and frontend services. The default development configuration exposes PostgreSQL on `5432`, Redis on `6379`, the backend on `5005`, and the frontend on `3901`.

## Project Structure

```text
Communication-Spectrum-Web-App/
│
├── backend/
│   ├── src/
│   │   ├── config.js
│   │   ├── error.js
│   │   ├── server.js
│   │   └── service.js
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   ├── Dockerfile
│   └── package.json
│
├── init/
│   ├── Dockerfile
│   ├── schema.sql
│   └── zdump.sql
│
├── docker-compose.yml
└── init-db.sh
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### Run with Docker Compose

Clone the repository:

```bash
git clone https://github.com/Manjot44/Communication-Spectrum-Web-App.git
cd Communication-Spectrum-Web-App
```

Start the application:

```bash
docker compose up --build
```

Once the containers have started, the services are available at:

| Service    | URL                   |
| ---------- | --------------------- |
| Frontend   | http://localhost:3901 |
| Backend    | http://localhost:5005 |
| PostgreSQL | localhost:5432        |
| Redis      | localhost:6379        |

The frontend is configured to communicate with the backend through `http://localhost:5005`.

### Stop the application

```bash
docker compose down
```

To remove the associated volumes as well:

```bash
docker compose down -v
```

## Running Without Docker

### Backend

Navigate to the backend directory:

```bash
cd backend
npm install
npm run dev
```

The backend development server runs on port `5005`.

Available scripts include:

```bash
npm test
npm run lint
npm run dev
npm start
```

The backend uses Jest for testing and ESLint for code quality checks.

### Frontend

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

The React development server will start using the project's configured development setup.

Available scripts include:

```bash
npm start
npm run build
npm test
npm run lint
```

## Database

The application uses PostgreSQL for persistent application data.

Database initialisation files are located in the `init/` directory:

```text
init/
├── Dockerfile
├── schema.sql
└── zdump.sql
```

The database is automatically initialised when the Docker Compose database service is created.

## Architecture

The application follows a client-server architecture:

```text
┌───────────────────────┐
│       React           │
│      Frontend         │
│      Port 3901        │
└───────────┬───────────┘
            │
            │ HTTP / API
            ▼
┌───────────────────────┐
│      Express          │
│       Backend         │
│      Port 5005        │
└───────┬─────────┬─────┘
        │         │
        ▼         ▼
┌────────────┐  ┌────────────┐
│ PostgreSQL │  │   Redis    │
│   :5432    │  │   :6379    │
└────────────┘  └────────────┘
```

Docker Compose manages the four services and their dependencies.

## Testing

Backend tests can be run with:

```bash
cd backend
npm test
```

Frontend tests can be run with:

```bash
cd frontend
npm test
```

Linting is available for both the frontend and backend.

## Development

The project is structured to separate frontend presentation and user interaction from backend services and persistent data.

### Frontend

The frontend is divided into:

* `pages/` — application-level screens and workflows
* `components/` — reusable UI components
* `services/` — API and external service interactions
* `utils/` — shared utility functionality
* `assets/` — static assets

The application includes dedicated workflows for authentication, support creation, template selection, scheduling, galleries, sharing, and user management.

### Backend

The backend contains:

* Express server configuration
* Application services
* Database configuration
* Error handling
* Automated tests
* Linting and development tooling

## Project Context

This project was developed as a university software engineering project and involved the design and implementation of a full-stack web application.

The repository contains the complete frontend, backend, database setup, automated testing, and Docker-based development environment.

## License

This project is currently provided without an explicit open-source licence.


