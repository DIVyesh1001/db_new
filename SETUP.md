# React Frontend Setup Guide

## Overview

This React frontend application has been created based on the HTML mockups provided. It includes:

- **Logged Out Homepage**: Marketing page with features overview
- **Login Page**: User authentication
- **Dashboard**: Overview page showing KPIs, markets, datasets, dashboards, and reports (requires login)
- **Market Detail Pages**: Detailed view of individual markets (requires login)

## Quick Start

1. **Install Dependencies**:
```bash
cd react_frontend
npm install
```

2. **Configure Environment**:
Create a `.env` file in the `react_frontend` directory:
```env
VITE_API_URL=http://localhost:8000/api
```

Or use the startup script which will create it automatically:
```bash
./start-react-frontend.sh
```

3. **Start Development Server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Project Structure

```
react_frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Header.css
│   │   ├── Footer.jsx        # Footer component
│   │   ├── Footer.css
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── pages/                # Page components
│   │   ├── Login.jsx         # Login page
│   │   ├── Login.css
│   │   ├── LoggedOutHomepage.jsx  # Public homepage
│   │   ├── LoggedOutHomepage.css
│   │   ├── Dashboard.jsx     # Main dashboard (logged in)
│   │   ├── Dashboard.css
│   │   ├── MarketDetail.jsx  # Market detail page
│   │   └── MarketDetail.css
│   ├── context/              # React Context
│   │   └── AuthContext.jsx   # Authentication context
│   ├── services/             # API services
│   │   ├── api.js           # Axios instance
│   │   ├── authService.js   # Auth API calls
│   │   └── datasetService.js # Dataset API calls
│   ├── styles/              # Global styles
│   │   └── index.css
│   ├── App.jsx              # Main app with routing
│   ├── App.css
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features

### Authentication
- Login/logout functionality
- Protected routes for authenticated users
- Automatic redirect to login for protected pages

### Pages

1. **Logged Out Homepage** (`/`)
   - Hero section with CTA buttons
   - Features overview
   - Preview section
   - Footer CTA

2. **Login Page** (`/login`)
   - Email/password login form
   - Error handling
   - Redirects to dashboard on success

3. **Dashboard** (`/dashboard`) - Protected
   - Search box
   - KPI cards (Retail Market Size, Online Commerce, etc.)
   - Dashboard cards (Retail Store Locator, UPI Monitor, etc.)
   - Charts section
   - Markets grid (clickable tiles)
   - Companies section
   - Datasets section (fetches from backend API)
   - Reports section
   - CTA section

4. **Market Detail** (`/markets/:marketName`) - Protected
   - Market title and metadata
   - KPI cards
   - Description
   - Charts grid
   - Categories
   - Market drivers and challenges
   - Analyst insights
   - Related reports
   - CTA section

## API Integration

The frontend integrates with the existing backend API:

- **Authentication**: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- **Datasets**: `/api/datasets`, `/api/datasets/:id`, `/api/datasets/:id/data`

## Styling

The UI follows the design from the HTML mockups:
- Color scheme: Purple (#51087e) primary, white backgrounds, gray text
- Typography: Inter font family
- Layout: Responsive grid layouts
- Cards: White cards with subtle shadows
- Hover effects: Transform and shadow transitions

## Routes

- `/` - Logged out homepage (public)
- `/login` - Login page (public)
- `/dashboard` - Dashboard (protected)
- `/markets/:marketName` - Market detail page (protected)
- Other routes redirect to dashboard

## Development

- Uses Vite for fast development
- React Router for navigation
- Axios for API calls
- Context API for state management

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

