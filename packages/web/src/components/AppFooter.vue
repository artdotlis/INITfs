<script setup lang="ts">
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();
</script>

<template>
    <div>FOOT</div>
    <div>loaded: {{ counter.count }}</div>
    <button @click="counter.increment">
        increase
    </button>
</template>
