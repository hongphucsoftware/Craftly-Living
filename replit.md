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
- **Primary Database**: Supabase PostgreSQL database (migrated from Neon)
- **Connection**: Direct PostgreSQL connection using Drizzle ORM
- **Tables**: Users, renovation_projects, and builders with full schema
- **API Integration**: RESTful API endpoints for all data operations
- **Database Operations**: Full CRUD operations for projects and builders

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
- June 30, 2025. Created comprehensive builder profile signup page with image upload functionality
- June 30, 2025. Added builders database table and API endpoints for professional registration
- June 30, 2025. Integrated builder signup form into join network page with professional UI
- June 30, 2025. Fixed database connection issues by migrating from Supabase to PostgreSQL
- June 30, 2025. Implemented success popup notification after builder profile creation
- June 30, 2025. Created personal builder dashboard with tabbed interface for profile management
- June 30, 2025. Added automatic redirect to builder dashboard after successful registration
- June 30, 2025. Fixed database validation errors for empty string handling in optional fields
- June 30, 2025. Enhanced builder dashboard with individual data fetching by ID from database
- June 30, 2025. Added comprehensive image management sections for profile photos and portfolio galleries
- June 30, 2025. Created Vercel-compatible API endpoints with serverless functions for deployment
- June 30, 2025. Implemented proper CORS handling and database connections for Vercel deployment
- June 30, 2025. Fixed deployment build process with custom build script for proper file structure
- June 30, 2025. Created automated build process that outputs server to dist/index.js as expected by start command
- June 30, 2025. Resolved production deployment issues with proper frontend and backend compilation
- June 30, 2025. Fixed deployment build process by ensuring dist directory creation before file copying
- June 30, 2025. Updated server configuration to use 0.0.0.0 host for proper deployment compatibility
- June 30, 2025. Added comprehensive error handling and logging to server startup process
- June 30, 2025. Created deploy.js script for streamlined deployment preparation and verification
- June 30, 2025. Resolved all deployment issues with multiple build script solutions (build-deployment.js, npm-build.js, postbuild.js)
- June 30, 2025. Fixed server TypeScript configuration and port binding for production deployment compatibility
- June 30, 2025. Created comprehensive deployment documentation and verification testing
- June 30, 2025. Confirmed deployment readiness across all major Node.js hosting platforms
- July 15, 2025. Fixed onboarding form submission by updating schema to handle budget field properly
- July 15, 2025. Migrated database from Neon to Supabase PostgreSQL with full data preservation
- July 15, 2025. Verified all API endpoints and database operations working correctly with Supabase
- July 15, 2025. Completely removed Neon database dependencies and switched to standard PostgreSQL
- July 15, 2025. Updated all API endpoints to use pg driver with proper SSL configuration for Supabase
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```