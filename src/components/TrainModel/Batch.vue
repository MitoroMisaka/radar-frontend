<template>
  <div>
    <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="50" />
    当前值：{{ value }}
  </div>
</template>
<script setup>
import { ref } from 'vue';
const value = ref(3);
</script>