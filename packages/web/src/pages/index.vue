<script setup lang="ts">
import { useFetch, useHead, useSeoMeta } from '#app';
import ApiRoutes from '#shared/utils/apiRoutes.js';

useHead({
    bodyAttrs: { class: 'initfs' },
});

useSeoMeta({
    title: 'INITfs - main',
    ogTitle: 'INITfs - main',
    description: 'The main page.',
    ogDescription: 'The main page.',
});

const { data } = await useFetch<{ hello: string }>(ApiRoutes.hello);
</script>

<template>
    <div>{{ data?.hello ?? 'Hi' }} World!</div>
</template>
