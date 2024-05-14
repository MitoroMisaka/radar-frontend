<script setup lang="ts">
import { ref } from 'vue';


const value1 = ref<string>('a');
const value2 = ref<string>('e');
</script>

<template>
  <a-space direction="vertical" class="radio-group-container">
    <a-card title="数据处理" style="width: 1000px" >
    <div>
      <a-typography-title :level="4">加窗方式</a-typography-title >
      <br>
      <a-radio-group v-model:value="value1" class="custom-radio-group" size="large">
        <a-radio value="b">汉明窗</a-radio>
        <a-radio value="c">汉宁窗</a-radio>
        <a-radio value="d">布莱克曼窗</a-radio>
      </a-radio-group>
      <br>
    </div>
      <div>
        <a-typography-title :level="4">静态杂波抑制</a-typography-title>
        <br>
        <a-radio-group v-model:value="value2" class="custom-radio-group" size="large">
          <a-radio value="a">零速通道置零</a-radio>
          <a-radio value="b">MTI</a-radio>
          <a-radio value="c">平均相消法</a-radio>
        </a-radio-group>
        <br>
      </div>
      <img src="@/components/img/preprocess.png" alt="1" width="1000" height="300">
      <br>
    </a-card>
  </a-space>
</template>

<style scoped>
.radio-group-container {
  width: 100%; /* Set the width of the container */
}

.custom-radio-group {
  width: 100%; /* Set the width of the radio group */
  display: flex;
  justify-content: space-around; /* Adjust as needed for spacing between buttons */
}
</style>
