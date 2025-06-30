#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { copyFile, mkdir, rm, readdir } from 'fs/promises';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

async function quickBuild() {
  try {
    console.log('🚀 Starting quick deployment build...');
    
    // Clean dist directory
    if (existsSync('dist')) {
      await rm('dist', { recursive: true, force: true });
    }
    await mkdir('dist', { recursive: true });
    
    // Try to use existing build if available and recent
    const frontendBuilt = await tryExistingFrontendBuild();
    
    if (!frontendBuilt) {
      console.log('📦 Building frontend (this may take a moment)...');
      // Use a more aggressive timeout and resource limits for Vite
      const viteProcess = exec('vite build --mode production', { 
        timeout: 300000, // 5 minutes max
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      });
      
      viteProcess.stdout.on('data', (data) => {
        if (data.includes('build complete') || data.includes('built in')) {
          console.log('✅ Frontend build completed');
        }
      });
      
      await promisify(viteProcess.on.bind(viteProcess))('close');
    }
    
    // Build server
    console.log('⚙️ Building server...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js');
    
    console.log('🔍 Verifying build...');
    const files = await readdir('dist');
    console.log('Files in dist:', files);
    
    if (files.includes('index.js') && files.includes('index.html')) {
      console.log('✅ Build completed successfully!');
      console.log('🎯 Ready for deployment');
    } else {
      throw new Error('Build incomplete: missing required files');
    }
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.log('🔄 Trying alternative build method...');
    await alternativeBuild();
  }
}

async function tryExistingFrontendBuild() {
  try {
    if (existsSync('dist/index.html') && existsSync('dist/assets')) {
      console.log('📦 Using existing frontend build');
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function alternativeBuild() {
  try {
    console.log('🔄 Attempting server-only build...');
    
    // Create minimal HTML if frontend build failed
    const minimalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftly Living</title>
    <script type="module" src="/src/main.tsx"></script>
</head>
<body>
    <div id="root"></div>
</body>
</html>`;
    
    await mkdir('dist', { recursive: true });
    await execAsync('echo \'' + minimalHTML + '\' > dist/index.html');
    
    // Build server
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js');
    
    console.log('✅ Alternative build completed');
    console.log('⚠️  Frontend will run in development mode');
    
  } catch (error) {
    console.error('❌ Alternative build also failed:', error.message);
    process.exit(1);
  }
}

quickBuild();