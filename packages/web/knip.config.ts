export default {
    nuxt: true,
    entry: [
        'modules/**/*.{ts,tsx}',
        'src/plugins/**/*.{ts,tsx}',
        'eslint.config.mjs',
        'nuxt.config.ts',
        'src/app.{vue,jsx,tsx}',
        'src/error.{vue,jsx,tsx}',
        'src/pages/**/*.{vue,jsx,tsx}',
        'src/layouts/default.{vue,jsx,tsx}',
        'src/middleware/**/*.ts',
        'src/server/api/**/*.ts',
        'src/server/routes/**/*.ts',
        'src/server/middleware/**/*.ts',
        'src/server/plugins/**/*.ts',
    ],
    project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,mdx,md,vue,css}'],
    ignore: [
        '.data/**',
        'node_modules/**',
        'tests/**',
        'public/_extra/**',
        'src/app.config.ts',
    ],
    ignoreBinaries: ['knip', 'eslint', 'nuxt', 'vitest'],
    ignoreDependencies: [
        '@nuxt/.*',
        '@nuxtjs/.*',
        'nuxt-*',
        'happy-dom',
        '@vue/*',
        '@unhead/vue',
    ],
    compilers: {
        css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
    },
};
