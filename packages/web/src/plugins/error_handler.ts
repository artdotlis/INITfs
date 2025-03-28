import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.error('[APP-ERR-UNH]', info, error, instance);
    };
    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.error('[APP-ERR-ROOT]', error, instance, info);
    });
});
