<script setup lang="ts">
import { clearError } from '#app';
// clears all errors if exits
clearError();
</script>

<template>
    <NuxtLayout name="error">
        <h1>PANIC</h1>
        <div>Try clearing browser cache and call / page again!</div>
    </NuxtLayout>
</template>
