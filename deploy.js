#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function deploy() {
  try {
    console.log('🚀 Starting deployment process...');
    
    // Run the build process
    console.log('📦 Building application...');
    await execAsync('node build.js');
    
    console.log('🔍 Verifying build output...');
    const { stdout } = await execAsync('ls -la dist/');
    console.log(stdout);
    
    console.log('✅ Deployment preparation completed!');
    console.log('📁 Files ready for deployment in dist/ directory');
    console.log('🎯 Use "npm start" or "NODE_ENV=production node dist/index.js" to run in production');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

deploy();