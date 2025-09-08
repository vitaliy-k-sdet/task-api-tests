import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI === 'true';

export default defineConfig({
  workers: isCI ? 5 : undefined, // Set number of workers for parallel execution in CI
  fullyParallel: isCI, // Run tests in parallel in CI
  testDir: './tests',           
  timeout: 30 * 1000,          
  expect: {
    timeout: 5000,              
  },
  retries: 1,                  
  reporter: [['list'], ['html']], 
  use: {

    headless: true,
    actionTimeout: 10000,
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api-tests',
      testMatch: /.*\.spec\.ts/, 
    },
  ],
});
