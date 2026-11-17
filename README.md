# Learnwise — Learning Budget Planner

Learnwise is a MERN-stack application for planning a monthly learning budget and keeping track of learning resources.

## Features

- Set and update a monthly learning budget.
- Add, edit, and delete learning resources in the Course, Certification, and Tool categories.
- Track resource expenses against the budget and review category totals.
- Compare free and paid resources.
- Store budgets and resources in MongoDB through the Express API.

## Technologies

- **Frontend:** React 19, Vite
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Other:** JavaScript, npm

## Project structure

```text
learning-budget-planner/
├── backend/
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Budget and resource handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # Health, budget, and resource routes
│   ├── .env.example        # Local backend configuration template
│   └── server.js           # Express entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/     # Budget, resource, and comparison UI
│       └── pages/          # Dashboard
└── README.md
```

## Prerequisites

- Node.js 20.19 or newer (or 22.12 or newer) and npm. These versions satisfy the Vite version in the frontend lockfile.
- A MongoDB server, local or hosted, and its connection URI.

## Installation and setup

Install the frontend and backend dependencies in separate terminals:

```powershell
cd frontend
npm ci
```

```powershell
cd backend
npm ci
```

### Backend and environment variables

From the project root, create a local backend environment file from the template:

```powershell
Copy-Item backend\.env.example backend\.env
```

Edit `backend\.env` and set:

- `PORT` — API server port (defaults to `5000`).
- `MONGO_URI` — MongoDB connection string. The template uses a local MongoDB database named `learning_budget_planner`.

Keep `backend\.env` local; it is excluded from Git. Do not put credentials in the example file.

Start the backend from the `backend` directory:

```powershell
npm run dev
```

For a non-watch run, use `npm start`.

### Frontend

Start the frontend from the `frontend` directory:

```powershell
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The current frontend sends API requests to `http://localhost:5000`, so start the backend as well.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | API status message |
| `GET` | `/api/health` | Health-check response |
| `GET` | `/api/resources` | List learning resources |
| `POST` | `/api/resources` | Create a learning resource |
| `PUT` | `/api/resources/:id` | Update a learning resource |
| `DELETE` | `/api/resources/:id` | Delete a learning resource |
| `GET` | `/api/budget` | Read the monthly budget (creates the default budget if none exists) |
| `PUT` | `/api/budget` | Update the monthly budget |

## Screenshots

Screenshots are not included yet. Add screenshots here when available:

- Dashboard: `docs/screenshots/dashboard.png`
- Resource management: `docs/screenshots/resources.png`

## Future improvements

- Configure the API base URL for different environments.
- Add automated frontend and backend tests.
- Add authentication and user-specific budgets/resources.
- Add deployment instructions and hosted application links.

## Author

- **Name:** [Your Name]
- **Course / class:** [Your Course or Class]
- **GitHub:** [Your GitHub Profile URL]
