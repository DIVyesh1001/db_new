# Datum React Frontend

React frontend application for Datum - India's Retail & Consumer Data Platform.

## Features

- **Logged Out Homepage**: Marketing page with features overview
- **Login**: User authentication
- **Dashboard**: Overview of markets, datasets, dashboards, and reports (requires login)
- **Market Detail Pages**: Detailed view of individual markets (requires login)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Build

```bash
npm run build
```

## Project Structure

```
react_frontend/
├── src/
│   ├── components/      # Reusable components (Header, Footer)
│   ├── pages/          # Page components
│   ├── context/        # React context (AuthContext)
│   ├── services/       # API services
│   ├── styles/        # Global styles
│   ├── App.jsx        # Main app component with routing
│   └── main.jsx       # Entry point
├── package.json
└── vite.config.js
```

## Routes

- `/` - Logged out homepage
- `/login` - Login page
- `/dashboard` - Dashboard (protected, requires login)
- `/markets/:marketName` - Market detail page (protected, requires login)

