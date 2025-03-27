<script setup lang="ts">
import type { HelloRespT } from '#shared/types/api/HelloRespT';
import { useFetch, useHead, useSeoMeta } from '#app';
import HelloResp from '#shared/types/api/HelloRespT';
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
const storeKey = 'hello';
await useFetch<HelloRespT>(ApiRoutes.hello, {
    key: storeKey,
    transform: data => HelloResp.parse(data),
});
function clientLogError(error: unknown) {
    console.error(`[APP-LOCAL-ERR] ${error}`);
}
</script>

<template>
    <NuxtLayout>
        <NuxtErrorBoundary @error="clientLogError">
            <HelloWorld :store="storeKey" />
            <template #error="{ error, clearError }">
                local {{ error }}
                <button @click="clearError">
                    clear error
                </button>
            </template>
        </NuxtErrorBoundary>
    </NuxtLayout>
</template>
