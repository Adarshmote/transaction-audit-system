# Transaction Audit System

## Project Overview
The Transaction Audit System is a full-stack web application designed to record, monitor, and audit financial transactions. The system provides backend APIs for transaction management and a frontend interface for interacting with transaction data in a structured and transparent manner.

This project was developed as part of a technical assignment and demonstrates full-stack development, API design, database integration, and proper software documentation.

---

## Tech Stack
- Frontend: HTML, CSS, TypeScript , Angular
- Backend: Node.js with REST APIs
- Database: MongoDB
- Version Control: Git and GitHub

---

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas || Compass
- Git
- Vscode
- Angular setup

---

### Backend Setup
```bash
cd Backend
npm install
npm start

---

### Frontend Setup
cd Frontend
npm install
npm start

http://localhost:4200

---

## API Documentation
Method	Endpoint	Description
POST	/api/transactions	Create a transaction
GET	/api/transactions	Fetch all transactions
GET	/api/transactions/:id	Fetch transaction by ID
PUT	/api/transactions/:id	Update transaction
DELETE	/api/transactions/:id	Delete transaction

---

## Database Schema
Transactions Table
Column	Type	Description
id	INT (PK)	Unique transaction ID
amount	DECIMAL	Transaction amount
type	VARCHAR	Credit / Debit
status	VARCHAR	Transaction status
created_at	DATETIME	Transaction timestamp

---

## AI Tool Usage Log

AI tools were used responsibly for:

Debugging backend and frontend code

Structuring REST APIs

Improving database schema design

Writing and structuring project documentation (README)

All AI-assisted outputs were reviewed and validated before implementation.
