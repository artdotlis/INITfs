import { defineVitestConfig } from '@nuxt/test-utils/config';
import { configDefaults } from 'vitest/config';

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'nuxt',
        exclude: [
            ...configDefaults.exclude,
            'public/**',
            '**/node_modules/**',
            '**.config.ts',
            '.nuxt/**',
        ],
    },
});
