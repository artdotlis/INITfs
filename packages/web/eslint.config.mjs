import process from 'node:process';
import antfu from '@antfu/eslint-config';
import * as tsResolver from 'eslint-import-resolver-typescript';
// @ts-check
import { withNuxt } from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu(
        {
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
            },
            typescript: {
                tsconfigPath: 'tsconfig.json',
            },
            vue: true,
            jsonc: true,
            yaml: true,
            ignores: ['**/fixtures', '**/.nuxt', '**/public/extra', '**/assets/extra'],
        },
        {
            rules: {
                'import-x/no-unresolved': [
                    'error',
                    process.env.GITHUB_WORKER !== undefined
                        ? {
                              ignore: ['^(~/)?assets/extra/.+', '^/extra/.+'],
                          }
                        : {},
                ],
                'no-console': 'warn',
            },
        },
        {
            files: ['tests/**/*'],
            rules: {
                '@typescript-eslint/no-unsafe-call': 'warn',
            },
        },
        {
            settings: {
                'import-x/resolver': {
                    name: 'tsResolver',
                    resolver: tsResolver,
                    options: { alwaysTryTypes: true, project: 'tsconfig.app.json' },
                },
            },
        }
    )
);
