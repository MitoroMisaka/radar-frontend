<template>
  <a-cascader
      v-model:value="value"
      :options="options"
      expand-trigger="hover"
      placeholder="Please select"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
const options: CascaderProps['options'] = [
  {
    value: 'dataset1',
    label: '数据集1',
    children: [
      {
        value: 'data1',
        label: '数据1',
      },
    ],
  },
  {
    value: 'dataset2',
    label: '数据集2',
    children: [
      {
        value: 'data1',
        label: '数据1',
      },
    ],
  },
];

const value = ref<string[]>([]);
</script>

