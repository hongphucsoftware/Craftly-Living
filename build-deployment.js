#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { copyFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function buildForDeployment() {
  try {
    console.log('🏗️  Starting deployment build process...');
    
    // Clean previous builds
    if (existsSync('dist')) {
      await rm('dist', { recursive: true, force: true });
      console.log('🧹 Cleaned previous dist directory');
    }
    
    if (existsSync('server-dist')) {
      await rm('server-dist', { recursive: true, force: true });
      console.log('🧹 Cleaned previous server-dist directory');
    }
    
    // Run the frontend build
    console.log('📦 Building frontend with Vite...');
    await execAsync('vite build');
    console.log('✅ Frontend build completed');
    
    // Run the server build
    console.log('⚙️  Building server with esbuild...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=server-dist');
    console.log('✅ Server build completed');
    
    // Ensure dist directory exists
    console.log('🔧 Setting up deployment structure...');
    await mkdir('dist', { recursive: true });
    
    // Copy server bundle to the expected location
    if (existsSync('server-dist/index.js')) {
      await copyFile('server-dist/index.js', 'dist/index.js');
      console.log('✅ Server bundle copied to dist/index.js');
    } else {
      throw new Error('Server bundle not found at server-dist/index.js');
    }
    
    // Verify the build output
    console.log('🔍 Verifying build output...');
    const distContents = await execAsync('ls -la dist/');
    console.log('📁 dist/ contents:');
    console.log(distContents.stdout);
    
    console.log('✅ Deployment build completed successfully!');
    console.log('🚀 Ready for deployment with:');
    console.log('   - Frontend: dist/ (index.html, assets/)');
    console.log('   - Server: dist/index.js');
    console.log('   - Start command: npm start');
    
  } catch (error) {
    console.error('❌ Deployment build failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle different execution contexts
if (process.argv.includes('--npm-build')) {
  // This is being called from npm run build
  buildForDeployment();
} else {
  // This is being called directly
  buildForDeployment();
}