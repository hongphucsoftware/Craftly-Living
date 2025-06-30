#!/usr/bin/env node

import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

async function postBuild() {
  try {
    console.log('🔧 Running post-build fixes...');
    
    // Ensure dist directory exists
    if (!existsSync('dist')) {
      await mkdir('dist', { recursive: true });
      console.log('📁 Created dist directory');
    }
    
    // Check if server-dist/index.js exists (from the original build command)
    if (existsSync('server-dist/index.js')) {
      // Copy server file to expected location for deployment
      await copyFile('server-dist/index.js', 'dist/index.js');
      console.log('✅ Copied server bundle to dist/index.js');
    } else {
      console.error('❌ Server bundle not found at server-dist/index.js');
      process.exit(1);
    }
    
    console.log('🚀 Post-build fixes completed successfully!');
    
  } catch (error) {
    console.error('❌ Post-build failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

postBuild();