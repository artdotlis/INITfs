<script setup lang="ts">
import type { HelloRespT } from '#shared/@types/api_hello';
import { useAppConfig, useFetch, useHead, useSeoMeta } from '#app';
import { HelloWorld } from '#components';
import ApiRoutes from '#shared/constants/route/api';
import HelloResp from '#shared/schema/api/HelloResp';

useHead({
    bodyAttrs: { class: 'body' },
});

const appConf = useAppConfig();
useSeoMeta({
    title: `${appConf.name} - main`,
    description: 'The main page.',
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
