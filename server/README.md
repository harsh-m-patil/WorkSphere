# WorkSphere API

This is the backend API for the WorkSphere application, a platform connecting clients and freelancers.

## Features

- **User Authentication & Authorization:** Secure signup, login, and role-based access control (client, freelancer, admin) using JWT.
- **Work Management:** Clients can post, manage, and assign work. Freelancers can browse, apply for, and manage work applications.
- **User Profiles:** Detailed user profiles including skills, languages, certificates (for freelancers), and ratings.
- **Review System:** Clients can review freelancers after work completion.
- **Real-time Messaging:** (Implemented with Socket.IO) Real-time chat functionality between users.
- **Payment Integration:** Secure payment processing for subscriptions or services using Razorpay.
- **Admin Dashboard:** Functionality for administrators to manage users, works, and application settings ([routes/app.routes.js](routes/app.routes.js)).
- **API Documentation:** Interactive API documentation available via Swagger UI at `/api-docs`.
- **Redis Caching:** Utilizes Redis for improved performance by caching frequently accessed data.
- **Docker Support:** Fully containerized application using Docker and Docker Compose for easy setup and deployment.
- **CI/CD:** Continuous Integration and Continuous Deployment pipeline set up for automated testing and deployment (GitHub Actions).

## Tech Stack

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** ODM library for MongoDB.
- **Redis:** In-memory data structure store (used for caching/session management - verify usage).
- **JWT (JSON Web Tokens):** For secure authentication.
- **bcrypt:** For password hashing.
- **Razorpay:** Payment gateway integration.
- **Socket.IO:** (If used) For real-time communication.
- **Docker:** Containerization platform.
- **Swagger:** API documentation.
- **Winston:** Logging library.
- **Vitest:** Testing framework.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/harsh-m-patil/WorkSphere
    cd server
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables (see Environment Variables section below).

4.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

5.  **Run tests:**
    ```bash
    # Ensure that dev server is terminated
    pnpm test
    ```

## Running with Docker

You can also run the application using Docker Compose:

1.  **Ensure Docker and Docker Compose are installed.**
2.  **Create the `.env` file** as described in the Environment Variables section.
3.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```
    Use `-d` to run in detached mode:
    ```bash
    docker-compose up --build -d
    ```

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
NODE_ENV=development # or production

# Database Configuration
DATABASE_URL=mongodb://<user>:<password>@<host>:<port>/<database_name>?authSource=admin # Your MongoDB connection string
# Example for local Docker setup:
# DB_URI=mongodb://worksphere-db:27017/WorkSpherev2

# JWT Configuration
JWT_SECRET= # A strong, random secret key for signing JWTs
JWT_EXPIRES_IN=90d # How long a token is valid (e.g., 90d, 1h)
JWT_COOKIE_EXPIRES_IN=90 # How long the cookie storing the token lasts (in days)

# Server Configuration
PORT=3000 # Port the server will run on

# Redis Configuration (if used)
REDIS_URL=redis://localhost:6379
# For docker
# REDIS_URL=redis://worksphere-redis:6379

# Razorpay Configuration
RAZORPAY_KEY_ID= # Your Razorpay Key ID
RAZORPAY_SECRET= # Your Razorpay Key Secret

GOOGLE_GENERATIVE_AI_API_KEY=google-genai-api-key
```

**Where to get them:**

- `DATABASE_URL`: Provided by your MongoDB hosting service or configured during local MongoDB setup. For the default `docker-compose.yml` setup, use the example provided.
- `JWT_SECRET`: Generate a strong, random string. You can use an online generator or a command-line tool like `openssl rand -base64 32`.
- `RAZORPAY_KEY_ID` & `RAZORPAY_SECRET`: Obtain these from your Razorpay Dashboard under API Keys settings. **Keep your secret key confidential.**
- `REDIS_URL`: Provided by your Redis hosting service or configured during local/Docker setup. The defaults in the example match the `docker-compose.yml` service names.
- `GOOGLE_GENERATIVE_AI_API_KEY`: Obtain this key from [Google AI Studio](https://aistudio.google.com/app/apikey) or the Google Cloud Console by enabling the Generative Language API.

## API Documentation

API documentation is generated using Swagger. Once the server is running, access the interactive documentation at:

`http://localhost:<PORT>/api-docs` (Replace `<PORT>` with the actual port number, e.g., 3000)

## Project Structure

```
.
├── config/         # Database, Redis configuration
├── controllers/    # Route handlers (business logic)
├── data/           # Data seeding scripts/files
├── middlewares/    # Custom Express middlewares (auth, error handling, etc.)
├── models/         # Mongoose models (database schemas)
├── routes/         # API route definitions
├── utils/          # Utility functions (logger, AppError, swagger, etc.)
├── __test__/       # Test files (Vitest)
├── .dockerignore   # Files/folders to ignore in Docker build context
├── .env            # Environment variables (ignored by git)
├── .env.test       # Environment variables for testing
├── .gitignore      # Files/folders ignored by git
├── app.js          # Express application setup
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile      # Docker configuration for the application
├── package.json    # Project metadata and dependencies
├── pnpm-lock.yaml  # PNPM lock file
├── server.js       # Server entry point
└── README.md       # This file
```
