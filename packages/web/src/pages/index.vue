<script setup lang="ts">
import { useHead, useSeoMeta } from '#app';

useHead({
    bodyAttrs: { class: 'initfs' },
});

useSeoMeta({
    title: 'INITfs - main',
    ogTitle: 'INITfs - main',
    description: 'The main page.',
    ogDescription: 'The main page.',
});
</script>

<template>
    <div>Hello World!</div>
</template>
