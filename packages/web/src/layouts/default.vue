<script setup lang="ts">
import { AppFooter, AppHeader, NoScript } from '#components';
</script>

<template>
    <div>
        <NoScript>Enable JavaScript</NoScript>
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
</template>

<style lang="css">
body {
    font-family: 'Rubik', sans-serif;
}
</style>
