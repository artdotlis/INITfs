<script setup lang="ts">
import type { HelloRespT } from '#shared/types/api/HelloRespT';
import { createError, useNuxtData } from '#app';

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
    <button @click="throwError">
        Panic
    </button>
</template>
