import { UiRoutes } from '#imports';
import { clearError, defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.error('[APP-ERR]', info, error, instance);
        void clearError({ redirect: UiRoutes.panic });
    };
    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.error('[APP-ERR-VUE]', error, instance, info);
    });
});
