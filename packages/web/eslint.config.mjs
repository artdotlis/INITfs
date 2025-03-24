// @ts-check
import { withNuxt } from './.nuxt/eslint.config.mjs';
import conf_js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import * as pa_ts from '@typescript-eslint/parser';
import * as tsResolver from 'eslint-import-resolver-typescript';

export default withNuxt(
    conf_js.configs.recommended,
    // @ts-ignore
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        languageOptions: {
            parser: pa_ts,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'import-x/no-unresolved': [
                'error',
                process.env['GITHUB_WORKER'] !== undefined
                    ? {
                        ignore: ['^(~/)?assets/extra/.+', '^/extra/.+',],
                    }
                    : {},
            ],
        },
        settings: {
            'import-x/resolver': {
                name: 'tsResolver',
                resolver: tsResolver,
                options: { alwaysTryTypes: true, project: 'tsconfig.app.json' },
            },
        },
    }
);
