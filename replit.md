# Craftly Living - Renovation Matching Platform

## Overview

Craftly Living is a full-stack web application that connects homeowners with trusted renovation contractors across North Sydney, Northern Beaches, and Eastern Suburbs. The platform serves as a matching service where users can submit their renovation projects and get matched with pre-vetted local contractors based on their specific needs, budget, and Australian location.

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
- **Primary Database**: Supabase PostgreSQL database
- **Production Storage**: SupabaseStorage class implementing Supabase JavaScript client
- **API Client**: Supabase JavaScript SDK for type-safe database operations
- **Connection**: Direct Supabase REST API integration with anon key authentication
- **Tables**: Users and renovation_projects with Row Level Security policies

## Key Components

### Client-Side Components
1. **Landing Page**: Complete marketing site with hero section, features, testimonials
2. **Navigation**: Responsive navigation with mobile menu support
3. **Project Dashboard**: Real-time project tracking with contractor matching display
4. **UI Components**: Full shadcn/ui component library implementation
5. **Form Handling**: Type-safe forms with validation
6. **Toast System**: User feedback and notifications

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
- June 17, 2025. Initial setup with landing page components
- June 17, 2025. Added multi-step homeowner onboarding form with renovation project data collection
- June 20, 2025. Migrated from in-memory storage to PostgreSQL database integration
- June 20, 2025. Implemented DatabaseStorage class with Drizzle ORM and Neon serverless connection
- June 20, 2025. Fixed database connection issues and TypeScript path resolution
- June 20, 2025. Resolved budget field mapping between frontend form and backend API
- June 20, 2025. Fixed foreign key constraints for user-less project submissions
- June 20, 2025. Connected to new PostgreSQL database with full functionality
- June 20, 2025. Implemented Australian focus: North Sydney, Northern Beaches, Eastern Suburbs
- June 20, 2025. Added location search with Google Maps integration on homepage
- June 20, 2025. Updated budget ranges to Australian dollars ($15k-$100k+)
- June 20, 2025. Added contractor portfolio image galleries with real project samples
- June 20, 2025. Created image upload component for contractor profiles
- June 20, 2025. Built project dashboard with real-time tracking and contractor matching
- June 20, 2025. Added dashboard navigation and mobile menu integration
- June 20, 2025. Migrated from Neon PostgreSQL to Supabase database
- June 20, 2025. Updated storage layer to use Supabase JavaScript client
- June 20, 2025. Configured Row Level Security policies for public access
- June 20, 2025. Successfully created database tables in Supabase with full functionality
- June 20, 2025. Verified project creation and database operations working correctly
- June 21, 2025. Split platform into distinct homeowner and builder audiences
- June 21, 2025. Redesigned homepage with warm, reassuring homeowner-focused messaging
- June 21, 2025. Created dedicated builder network page at /join-network
- June 21, 2025. Updated navigation to separate homeowner and tradie sections
- June 21, 2025. Implemented amber color scheme for warmer, curated feel
- June 21, 2025. Added 3-step process visualization for homeowner journey
- June 21, 2025. Created B2B messaging for builder recruitment with quality lead focus
- June 23, 2025. Replaced featured contractors with "Featured Tradies" carousel section
- June 23, 2025. Implemented local tradie profiles by area with real project portfolios
- June 23, 2025. Added Luke Sully example tradie for Northern Beaches plumbing services
- June 23, 2025. Updated contact information to +61 401 093 899 and hi.craftlyliving@gmail.com
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```