#!/usr/bin/env node

// This script replaces npm run build for deployment compatibility
// It ensures dist/index.js is created properly for the start command

import { exec } from 'child_process';
import { promisify } from 'util';
import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

async function npmBuild() {
  try {
    // Run the standard vite build
    console.log('Building frontend...');
    await execAsync('vite build');
    
    // Run the server build
    console.log('Building server...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=server-dist');
    
    // Ensure dist directory exists (vite build should create it)
    await mkdir('dist', { recursive: true });
    
    // Copy server to expected location
    if (existsSync('server-dist/index.js')) {
      await copyFile('server-dist/index.js', 'dist/index.js');
      console.log('✅ Server bundle ready at dist/index.js');
    }
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

npmBuild();