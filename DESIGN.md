# DESIGN.md

## Overview

This frontend application serves as the user interface for the Mini E-Wallet system.

Users can:

* Login
* View current balance
* Transfer funds
* View transaction history

The frontend communicates with a Laravel REST API.

---

## Architecture

React Application

↓

Axios Service Layer

↓

Laravel API

↓

MySQL Database

---

## Routing Structure

/

Login Page

/dashboard

Dashboard Page

/transfer

Transfer Page

/transactions

Transaction History Page

---

## Page Design

### Login

Purpose:

Authenticate users.

Features:

* Email input
* Password input
* Validation
* Loading state
* Error handling

---

### Dashboard

Purpose:

Display user information.

Features:

* User name
* Current balance
* Quick actions

Actions:

* Transfer Funds
* View Transactions

---

### Transfer

Purpose:

Transfer money to another user.

Features:

* Recipient selection
* Amount input
* Validation
* Loading state
* Success notification
* Error notification

Rules:

* Cannot transfer to self
* Amount must be greater than zero
* Balance must be sufficient

---

### Transaction History

Purpose:

Display transfer records.

Features:

* Pagination
* Date sorting
* Transaction amount
* Transaction type
* Transaction identifier

Default Sort:

Newest First

---

## State Management

TanStack Query is used for:

* User profile
* Current balance
* Transaction history

Benefits:

* Caching
* Automatic refetching
* Better user experience

---

## API Design Assumptions

Authentication

POST /api/login

User Profile

GET /api/me

Transfer

POST /api/transfers

Transaction History

GET /api/transactions

---

## UI Design Principles

Financial applications require:

* Clear hierarchy
* Readable numbers
* Predictable interactions

The design focuses on usability rather than visual complexity.

---

## Scalability Considerations

Prepared for future features:

* Top-up
* Withdrawal
* Notifications
* Multiple wallets
* Transaction filtering
* Dark mode

The architecture supports future growth without major restructuring.
