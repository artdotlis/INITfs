<script setup lang="ts">
import type { NuxtError } from '#app';
import { clearError } from '#app';
import UiRoutes from '#shared/utils/UiRoutes';

defineProps({
    error: {
        type: Object as () => NuxtError,
        required: false,
    },
});
const to = () => clearError({ redirect: UiRoutes.root });
</script>

<template>
    <NuxtLayout name="error">
        <div>
            <h1>{{ error?.statusCode ?? 500 }}</h1>
            <button @click="to">
                Go back home
            </button>
        </div>
    </NuxtLayout>
</template>
