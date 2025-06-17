# Craftly Living - Renovation Matching Platform

## Overview

Craftly Living is a full-stack web application that connects homeowners with trusted renovation contractors. The platform serves as a matching service where users can submit their renovation projects and get matched with pre-vetted contractors based on their specific needs, budget, and location.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: Radix UI components with shadcn/ui styling
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for production)
- **Development Storage**: In-memory storage implementation for rapid development
- **ORM**: Drizzle ORM with type-safe queries and schema management
- **Migrations**: Drizzle Kit for database schema migrations

## Key Components

### Client-Side Components
1. **Landing Page**: Complete marketing site with hero section, features, testimonials
2. **Navigation**: Responsive navigation with mobile menu support
3. **UI Components**: Full shadcn/ui component library implementation
4. **Form Handling**: Type-safe forms with validation
5. **Toast System**: User feedback and notifications

### Server-Side Components
1. **API Routes**: RESTful API with Express router
2. **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
3. **Middleware**: Request logging, error handling, and session management
4. **Static Serving**: Vite integration for development and static assets in production

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Schema designed to accommodate contractor profiles, projects, and matching algorithms

## Data Flow

1. **User Registration/Login**: Users create accounts and authenticate through the user management system
2. **Project Submission**: Homeowners submit renovation projects with details, budget, and preferences
3. **Contractor Matching**: Algorithm matches projects with suitable contractors based on criteria
4. **Communication**: Platform facilitates communication between homeowners and contractors
5. **Project Management**: Tools for tracking project progress and milestones

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives with Tailwind CSS
- **Form Management**: React Hook Form with Hookform Resolvers
- **Data Fetching**: TanStack Query for server state
- **Utilities**: Class Variance Authority, clsx, date-fns

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with Drizzle Kit
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Hot Reload**: Vite dev server with HMR
- **Port Configuration**: Application runs on port 5000

### Production Build
- **Frontend**: Vite build process outputs to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Assets**: Served from build output directory
- **Process**: Single Node.js process serving both API and static assets

### Database Configuration
- **Development**: Can use in-memory storage for rapid prototyping
- **Production**: PostgreSQL with connection pooling via Neon
- **Schema Management**: Drizzle migrations handle database schema changes
- **Environment**: Database URL configured via environment variables

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```