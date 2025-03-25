<script setup lang="ts">
import type { NuxtError } from '#app';
import UiRoutes from '#shared/utils/uiRoutes';

defineProps({
    error: {
        type: Object as () => NuxtError,
        required: false,
    },
});
const to = UiRoutes.root;
</script>

<template>
    <div>
        <h1>{{ error?.statusCode ?? 500 }}</h1>
        <NuxtLink :to="to">
            Go back home
        </NuxtLink>
    </div>
</template>
