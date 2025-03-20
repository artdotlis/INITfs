export default {
    entry: ['app.vue'],
    project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,mdx,md,vue}'],
    ignore: ['.nuxt/**', '.data/**', 'app.config.ts'],
    ignoreBinaries: ['knip', 'eslint', 'nuxt'],
    ignoreDependencies: ['@nuxt/.*', 'nuxt-security', 'vue', 'vue-router'],
    compilers: {
        css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
        yaml: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
    },
};
