<script setup lang="ts">
import type { HelloRespT } from '#shared/@types/api_hello';
import { createError, useNuxtData } from '#app';
import { NuxtImg } from '#components';

const props = defineProps({
    store: {
        type: String,
        required: true,
    },
});
const { store } = props;
const { data: hello } = useNuxtData<HelloRespT>(store);

function throwError() {
    throw createError('custom client error');
}
</script>

<template>
    <div>{{ hello?.hello ?? 'Hi' }} World!</div>
    <NuxtImg src="/_images/logo.webp" width="80" alt="Logo" />
    <button @click="throwError">
        Panic
    </button>
</template>
