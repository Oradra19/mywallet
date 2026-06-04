# AGENT.md

## Project

Mini E-Wallet Frontend

Tech Stack:

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* TanStack Query

The frontend consumes a Laravel REST API.

---

## Development Principles

### 1. Component Driven Development

Build reusable components.

Examples:

* Button
* Input
* Card
* Modal
* Table
* Pagination

Avoid duplicated UI code.

---

### 2. Separation of Concerns

Pages should focus on presentation.

Business logic should be extracted into:

* hooks
* services
* utilities

Example:

Bad:

Dashboard.jsx contains API logic.

Good:

useDashboard.js handles API calls.

---

### 3. Folder Structure

src/

components/
ui/
layout/

pages/
login/
dashboard/
transfer/
transactions/

hooks/

services/

routes/

utils/

types/

---

### 4. API Communication

Use Axios instance.

All API calls must be placed inside:

src/services

Example:

authService.js

walletService.js

transactionService.js

Never call fetch directly inside pages.

---

### 5. State Management

Use TanStack Query.

Server state:

* user profile
* balance
* transaction history

Avoid unnecessary global state.

---

### 6. Error Handling

Every API request must handle:

* Validation errors
* Unauthorized errors
* Server errors

Display meaningful messages.

Example:

"Insufficient balance"

instead of

"Something went wrong"

---

### 7. Loading State

Every async operation must show loading feedback.

Examples:

* Login button loading
* Transfer button loading
* Transaction table loading

Never leave users without feedback.

---

### 8. Authentication

Authentication uses JWT/Sanctum token.

Store token in:

localStorage

Create:

ProtectedRoute

to protect authenticated pages.

---

### 9. Form Validation

Validate:

Login

* Email required
* Password required

Transfer

* Recipient required
* Amount > 0
* Cannot transfer to self

---

### 10. Naming Convention

Components:

TransferForm.jsx

Hooks:

useTransfer.js

Services:

walletService.js

Variables:

currentBalance

Avoid abbreviations.

---

### 11. UI Principles

Prioritize:

* Clarity
* Simplicity
* Accessibility

Do not overdesign.

This is a financial application.

Use consistent spacing and typography.

---

### 12. Code Quality

Prioritize:

1. Readability
2. Maintainability
3. Reusability

Avoid premature optimization.
