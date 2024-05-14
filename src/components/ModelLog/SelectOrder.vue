<template>
  <a-select
      v-model:value="value"
      show-search
      placeholder="选择筛选方式"
      style="width: 200px"
      :options="options"
      :filter-option="filterOption"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue';
import { ref } from 'vue';
const options = ref<SelectProps['options']>([
  { value: 'model', label: '模型' },
  { value: 'tap', label: '标签' },
  { value: 'introduction', label: '简介' },
]);
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const value = ref<string | undefined>(undefined);
</script>

