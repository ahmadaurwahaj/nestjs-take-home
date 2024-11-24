# **NestJS Backend Developer Take-Home Test**

## **Overview**

This project is a demonstration of a RESTful API using **NestJS**, with integration of PostgreSQL for database management and Redis for a messaging queue. The solution addresses the following tasks:

1. Developing RESTful API endpoints for user management.
2. Designing a PostgreSQL schema and optimizing data queries.
3. Integrating a Redis-based message queue for sending welcome messages to users.
4. Highlighting performance optimizations and security measures.

---

## **Setup Instructions**

### **1. Prerequisites**

Ensure you have the following installed:

- **Node.js**: Version 18 or higher.
- **PostgreSQL**: For the database backend.
- **Redis**: For the message queue.
- **Docker (Optional)**: If you prefer using Docker for PostgreSQL and Redis.

### **2. Environment Variables**

Create a `.env` file in the root directory with the following content:

```
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

.env.example file is added for reference, check that to setup environment.

### **3. Install Dependencies**

Run the following command to install project dependencies:

```bash
npm install
```

### **4. Start the Application**

Start the development server:

```bash
npm run start:dev
```

---

## **Task Explanations**

### **Task 1: RESTful API**

**Objective**: Develop a RESTful API with POST and GET endpoints to manage user information.

- **Endpoints**:

  - `/api`: Swagger documentation of all the API routes.

- **Example Requests**:
  - `POST /users`: Add a new user.
  - `GET /users`: Retrieve all users.

---

### **Task 2: Database Schema and Optimization**

**Objective**: Design a PostgreSQL schema for the `users` table and optimize queries.

- **Schema**:
  - The table `users` includes:
    - `userId` (Primary Key)
    - `name`
    - `email` (Unique)
    - `age`
- **Optimized Query**:

  - Query to fetch all users over the age of 18, sorted by name in ascending order.
  - Used a composite index on `age` and `name` for better query performance.

- **Indexing**:
  - Added a unique index on `email` for enforcing constraints.
  - Added a composite index on `age` and `name` to optimize common queries.

---

### **Task 3: Message Queue Integration**

**Objective**: Simulate sending a "Welcome" message to a user after signing up using Redis.

- **Messaging System**:

  - Used Redis as the messaging system.
  - Integrated a producer to send messages to a `welcome-queue`.
  - Integrated a consumer to process messages from the queue.

- **Steps**:

  - Created a `RedisService` for managing Redis connections.
  - Implemented a `UserProducerService` to publish messages to Redis.
  - Implemented a `UserConsumerService` to consume messages from Redis and process them.

- **Message Flow**:
  1. When a new user is created, a "Welcome" message is sent to the Redis queue.
  2. The consumer processes the message and logs it (or performs further actions like sending an email).

---

### **Task 4: API Performance and Security**

#### **Performance Optimizations**

1. **Caching**:
   - Utilize Redis or an in-memory cache for frequently accessed data to reduce database queries.
2. **Pagination**:
   - Use pagination for `GET /users` to limit the number of records returned, improving performance for large datasets.
3. **Database Indexing**:
   - Unique index on `email` for faster lookups.
   - Composite index on `age` and `name` for optimized sorting and filtering.
4. **Efficient Query Design**:
   - Used parameterized queries and avoided wildcard selections (`SELECT *`) for better query planning.
5. **Connection Pooling**:
   - Leveraged TypeORM's built-in connection pooling for database queries.

#### **Security Measures**

1. **Input Validation**:
   - Validated all incoming requests using `class-validator` and `class-transformer`.
2. **Rate Limiting**:
   - Protect the API from abuse by implementing rate limiting using middleware like `nestjs-rate-limiter`.
3. **Helmet Middleware**:
   - Used `@nestjs/helmet` to set secure HTTP headers and protect against common vulnerabilities.
4. **Data Sanitization**:
   - Sanitized all user input to prevent injection attacks.
5. **Authentication and Authorization**:
   - While not implemented in this test, use JWT or OAuth2 for securing sensitive endpoints.
