<script setup lang="ts">
import { useFetch, useHead, useSeoMeta } from '#app';
import ApiRoutes from '#shared/utils/ApiRoutes';
import HelloWorld from '~/components/HelloWorld.vue';

useHead({
    bodyAttrs: { class: 'initfs' },
});

useSeoMeta({
    title: 'INITfs - main',
    ogTitle: 'INITfs - main',
    description: 'The main page.',
    ogDescription: 'The main page.',
});

await useFetch<{ hello: string }>(ApiRoutes.hello, {
    key: 'hello',
});

function clientLogError(error: unknown) {
    console.error(`[APP-LOCAL-ERR] ${error}`);
}
</script>

<template>
    <NuxtLayout>
        <NuxtErrorBoundary @error="clientLogError">
            <HelloWorld />
            <template #error="{ error, clearError }">
                local {{ error }}
                <button @click="clearError">
                    clear error
                </button>
            </template>
        </NuxtErrorBoundary>
    </NuxtLayout>
</template>
