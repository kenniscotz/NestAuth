Here's a professional **README.md** you can use for your GitHub repository.

# 🔐 NestJS Authentication API

A simple demo authentication API built with **NestJS**, **Passport.js**, and **JWT (JSON Web Token)**. This project demonstrates a basic authentication flow including user registration, login, JWT generation, and protected routes using Passport's JWT strategy.
Most project will use OAuth tools but it's good to know how it works under the hoood
> **Note:** This project uses an **in-memory mock database** (`Users` array) for demonstration purposes. No external database is required.

---

## 🚀 Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Passport.js Local Strategy
* Passport.js JWT Strategy
* Protected Profile Route
* NestJS Best Practices

---

## 🛠 Tech Stack

* NestJS
* Passport.js
* Passport Local Strategy
* Passport JWT Strategy
* JWT
* bcrypt

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/nestjs-authentication.git
```

```bash
cd nestjs-authentication
```

---

## 2. Install Dependencies

Using npm

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

Example

```env
JWT_SECRET=mySuperSecretKey
JWT_EXPIRES_IN=1d
```

---

## 4. Start the Development Server

```bash
npm run start:dev
```

Application will start on

```
http://localhost:3000
```

---

# Project Structure

```
src/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── AuthDTO/
│   └── strategies/
│
├
│
├── utils/
│   └── bcrypt.ts
│
└── main.ts
```

---

# Authentication Flow

### Registration

1. User submits:

* Name
* Email
* Password

2. Password is hashed using bcrypt.

3. User is stored in the mock database.

4. Password is excluded from the response.

---

### Login

1. Passport Local Strategy validates credentials.

2. Password is compared with the stored hashed password.

3. If valid, a JWT is generated.

4. JWT is returned to the client.

---

### Protected Route

1. Client sends JWT in the Authorization header.

```
Authorization: Bearer <your_token>
```

2. Passport JWT Strategy validates the token.

3. User profile is returned.

---

# API Endpoints

## Register User

**POST**

```
POST /auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "id": 174902302,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## Get Profile (Protected)

**GET**

```
GET /auth/profile
```

### Headers

```
Authorization: Bearer <jwt_token>
```

### Success Response

```json
{
  "id": 174902302,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

# JWT Payload

After successful authentication, the generated JWT contains:

```json
{
  "sub": 174902302,
  "email": "john@example.com"
}
```

---

# Password Security

Passwords are never stored as plain text.

The project uses **bcrypt** to:

* Hash passwords during registration.
* Compare hashed passwords during login.

---

# Authentication Strategies

## Local Strategy

Used during login to validate user credentials.

* Finds user by email.
* Compares password using bcrypt.
* Returns authenticated user.

---

## JWT Strategy

Used to protect routes.

* Extracts JWT from the Authorization header.
* Validates the token.
* Attaches the authenticated user to the request.

---

# Authentication Guard

Protected routes use the JWT Auth Guard.

Example:

```typescript
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Request() req) {
  return this.authService.getProfile(req.user);
}
```

---

# Mock Database

For simplicity, this project stores users in an in-memory array.

```typescript
const Users = [];
```

This means:

* Data is lost when the server restarts.
* No database configuration is required.

For production applications, replace the mock database with a persistent database such as PostgreSQL, MySQL, or MongoDB.

---

# Available Scripts

Start development server

```bash
npm run start:dev
```




