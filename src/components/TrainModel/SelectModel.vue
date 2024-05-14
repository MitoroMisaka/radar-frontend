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
    value: 'model1',
    label: 'model_1',
    children: [
      {
        value: 'one',
        label: '0.652474496.0.00.1',
      },
    ],
  },
  {
    value: 'model2',
    label: '模型2',
    children: [
      {
        value: 'two',
        label: '2.0',
        children: [
          {
            value: 'void',
            label: '未预训练',
          },
          {
            value: 'pretrained',
            label: '已预训练',
          },
        ],
      },
    ],
  },
];

const value = ref<string[]>([]);
</script>

