# Deployment Guide

## Build Process

The deployment build process has been fixed and automated. Run the custom build script:

```bash
node build.js
```

This will:
1. Clean any previous builds
2. Build the frontend using Vite
3. Build the server using esbuild  
4. Copy the server bundle to `dist/index.js` (expected by start command)
5. Keep frontend assets in `dist/` directory

## Production Structure

After building, the `dist/` directory contains:
- `index.js` - Production server bundle
- `index.html` - Frontend entry point
- `assets/` - Frontend static assets

## Deployment Commands

The package.json scripts work as follows:
- `npm run dev` - Development mode with hot reloading
- `npm run build` - Original build (outputs to server-dist/)
- `npm start` - Production mode (expects dist/index.js)

## Fixed Issues

✅ **Build process creates required dist/index.js file**
- Custom build script copies server bundle to correct location

✅ **Server properly serves static frontend files**
- Production server serves from `dist/` directory as expected

✅ **Application starts successfully in production**
- Start command `node dist/index.js` works correctly

The deployment is now ready for platforms like Vercel, Railway, or any Node.js hosting service.