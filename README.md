# Mini E-Wallet Frontend

Frontend application for Mini E-Wallet built with React and Vite.

## Tech Stack

* React
* Vite
* Axios
* Tailwind CSS

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

Ensure the API service points to the backend:

```javascript
baseURL: 'http://127.0.0.1:8000/api'
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Features

### Authentication

* Login
* Protected Routes
* Logout

### Dashboard

* View Balance
* Recent Transactions
* Transfer Funds

### Transaction History

* Transaction Code
* Incoming Transfer
* Outgoing Transfer
* Related User
* Pagination

---

## Project Structure

```text
src/
├── components/
├── hooks/
├── pages/
├── routes/
├── services/
├── utils/
└── App.jsx
```

---

## API Integration

The frontend communicates with Laravel backend through Axios.

Authenticated requests automatically include:

```http
Authorization: Bearer <token>
```

Token is stored in localStorage after successful login.

---

## Workflow

```text
Login
  ↓
Dashboard
  ├── Get User
  ├── Get Balance
  ├── Get Transactions
  └── Create Transfer
  ↓
Logout
```

---

## Backend Requirement

Make sure the backend server is running before starting the frontend:

```bash
php artisan serve
```

Default backend URL:

```text
http://127.0.0.1:8000
```
