<script setup lang="ts">
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();
counter.increment();
</script>

<template>
    <div>loaded: {{ counter.count }}</div>
    <div>FOOT</div>
</template>
