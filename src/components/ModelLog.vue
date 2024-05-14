<script setup lang="ts">
import SelectOrder from './ModelLog/SelectOrder.vue';
import LogSearch from './ModelLog/LogSearch.vue';
import LogTable from './ModelLog/LogTable.vue';
</script>

<template>
  <a-space direction="vertical" style="margin-bottom: 30px;">
    <a-card title="模型日志" style="width: 1200px">
      <a-space direction="horizontal">
        <SelectOrder/>
        <LogSearch/>
      </a-space>
      <LogTable/>
    </a-card>
  </a-space>
</template>

<style scoped>

</style>