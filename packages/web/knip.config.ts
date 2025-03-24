export default {
    entry: [
        'nuxt.config.{js,mjs,ts}',
        'src/app.config.ts',
        'src/app.vue',
        'src/error.vue',
        'src/pages/**/*.vue',
        'src/layouts/default.vue',
        'src/middleware/**/*.ts',
        'src/server/api/**/*.ts',
        'src/server/routes/**/*.ts',
        'src/server/middleware/**/*.ts',
        'src/server/plugins/**/*.ts',
    ],
    project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,mdx,md,vue}'],
    ignore: ['.nuxt/**', '.data/**', 'app.config.ts'],
    ignoreBinaries: ['knip', 'eslint', 'nuxt'],
    ignoreDependencies: ['@nuxt/.*', 'nuxt-security', 'vue', 'vue-tsc', 'vue-router'],
    compilers: {
        css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
        yaml: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
    },
};
