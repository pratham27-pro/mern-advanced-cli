import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { generateProject } from './generators/projectGenerator.js';
import { validateProjectName } from './utils/validation.js';

const program = new Command();

export async function cli(args) {
  program
    .name('mern-advanced')
    .description('Advanced MERN stack CLI with production-ready structure')
    .version('1.0.0');

  program
    .command('create <project-name>')
    .description('Create a new MERN project')
    .option('-f, --frontend-only', 'Generate only frontend')
    .option('-b, --backend-only', 'Generate only backend')
    .option('--next', 'Use Next.js instead of React')
    .action(async (projectName, options) => {
      if (!validateProjectName(projectName)) {
        console.log(chalk.red('Invalid project name!'));
        return;
      }

      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useTailwind',
          message: 'Do you want to include Tailwind CSS?',
          default: true
        }
      ]);

      await generateProject(projectName, { ...options, ...answers });
    });

  program.parse(args);
}
