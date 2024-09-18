// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/ptests', // Directory containing your tests
  timeout: 30000,     // Global timeout for each test
  use: {
    baseURL: 'http://localhost:3000', // Base URL for your API
  },
};

export default config;