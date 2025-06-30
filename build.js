#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { copyFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('🏗️  Starting build process...');
    
    // Clean previous builds
    if (existsSync('dist')) {
      await rm('dist', { recursive: true, force: true });
    }
    
    console.log('📦 Building frontend...');
    await execAsync('vite build');
    
    console.log('⚙️  Building server...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=server-dist');
    
    console.log('🔧 Setting up production structure...');
    
    // Ensure dist directory exists
    await mkdir('dist', { recursive: true });
    
    // Copy server file to expected location
    await copyFile('server-dist/index.js', 'dist/index.js');
    
    console.log('✅ Build completed successfully!');
    console.log('📁 Structure:');
    console.log('   - Server: dist/index.js');
    console.log('   - Frontend: dist/ (index.html, assets/)');
    console.log('');
    console.log('🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

build();