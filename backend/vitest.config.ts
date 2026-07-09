import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // Tests share one local Postgres database; run files serially to avoid clobbering
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      include: ['src/services/**', 'src/middleware/**'],
    },
  },
});
