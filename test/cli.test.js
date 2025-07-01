#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const testProjectName = 'test-mern-app';
const testDir = path.join(process.cwd(), 'temp-test');

async function runTests() {
  console.log('🧪 Testing MERN Advanced CLI...\n');

  try {
    // Cleanup previous test
    if (fs.existsSync(testDir)) {
      fs.removeSync(testDir);
    }
    fs.ensureDirSync(testDir);
    process.chdir(testDir);

    // Test CLI creation
    console.log('✅ Testing project creation...');
    execSync(`mern-advanced create ${testProjectName}`, { stdio: 'inherit' });

    // Verify files exist
    const projectPath = path.join(testDir, testProjectName);
    const requiredFiles = [
      'backend/package.json',
      'backend/src/app.js',
      'backend/src/server.js',
      'frontend/package.json',
      'frontend/src/App.jsx',
      'frontend/vite.config.js'
    ];

    console.log('\n✅ Verifying generated files...');
    for (const file of requiredFiles) {
      const filePath = path.join(projectPath, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file: ${file}`);
      }
      console.log(`   ✓ ${file}`);
    }

    console.log('\n🎉 All tests passed!');
    
    // Cleanup
    process.chdir('..');
    fs.removeSync(testDir);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
