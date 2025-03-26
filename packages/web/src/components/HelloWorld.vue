<script setup lang="ts">
import { createError, useNuxtData } from '#app';

const { data: hello } = useNuxtData('hello');

function throwError() {
    throw createError('custom client error');
}
</script>

<template>
    <div>{{ hello?.hello ?? 'Hi' }} World!</div>
    <button @click="throwError">
        Panic
    </button>
</template>
