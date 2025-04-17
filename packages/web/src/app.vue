<script setup lang="ts">
import { useAppConfig } from '#app';
import { NuxtPage } from '#components';
import { defineOgImageComponent } from '#imports';

const appConf = useAppConfig();
defineOgImageComponent('App', {
    title: appConf.og.title,
});
</script>

<template>
    <NuxtPage />
</template>
