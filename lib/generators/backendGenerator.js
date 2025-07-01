import fs from 'fs-extra';
import path from 'path';
import { getBackendTemplates } from '../templates/backend/backendTemplates.js';

export async function generateBackend(projectPath, projectName) {
  const backendPath = path.join(projectPath, 'backend');
  
  // Create directory structure
  const directories = [
    'src/controllers',
    'src/models',
    'src/routes',
    'src/middlewares',
    'src/services',
    'src/utils',
    'src/config',
    'src/db'
  ];

  for (const dir of directories) {
    await fs.ensureDir(path.join(backendPath, dir));
  }

  const templates = getBackendTemplates(projectName);

  // Generate files
  for (const [filePath, content] of Object.entries(templates)) {
    await fs.writeFile(path.join(backendPath, filePath), content);
  }
}
