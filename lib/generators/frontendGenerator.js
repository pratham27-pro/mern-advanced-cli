import fs from 'fs-extra';
import path from 'path';
import { getFrontendTemplates } from '../templates/frontendTemplates.js';

export async function generateFrontend(projectPath, projectName, options) {
  const frontendPath = path.join(projectPath, 'frontend');
  
  // Create directory structure
  const directories = [
    'src/components',
    'src/pages',
    'src/hooks',
    'src/utils',
    'src/context',
    'src/services',
    'src/assets/images',
    'public'
  ];

  for (const dir of directories) {
    await fs.ensureDir(path.join(frontendPath, dir));
  }

  const templates = getFrontendTemplates(projectName, options);

  // Generate files
  for (const [filePath, content] of Object.entries(templates)) {
    await fs.writeFile(path.join(frontendPath, filePath), content);
  }
}
