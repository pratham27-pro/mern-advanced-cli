import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { generateBackend } from './backendGenerator.js';
import { generateFrontend } from './frontendGenerator.js';

export async function generateProject(projectName, options) {
  const projectPath = path.join(process.cwd(), projectName);

  try {
    console.log(chalk.blue(`Creating MERN project: ${projectName}`));
    
    await fs.ensureDir(projectPath);

    if (!options.frontendOnly) {
      await generateBackend(projectPath, projectName);
    }

    if (!options.backendOnly) {
      await generateFrontend(projectPath, projectName, options);
    }

    console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
    console.log(chalk.yellow('\nNext steps:'));
    console.log(`cd ${projectName}`);
    
    if (!options.frontendOnly) {
      console.log('cd backend && npm install && npm run dev');
    }
    
    if (!options.backendOnly) {
      console.log('cd frontend && npm install && npm start');
    }

  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
  }
}
