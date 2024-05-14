<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';

const value1 = ref<string>('');
const value2 = ref<string>('');
const selectedData = ref<{ batch_name: string; data_number: number }[]>([]);
const dataOptions = ref([]);
const imageUrl = ref<string>('');

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get_rawdata');
    const data = await response.json();
    dataOptions.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
    message.error('获取数据失败');
  }
};

const handleSubmit = async () => {
  const batch_name= selectedData.value[0] ;
  const data_number = selectedData.value[1];
  const url = `http://127.0.0.1:5000/single_preprocess/${batch_name}/${value1.value}/${value2.value}/${data_number}`;
  console.log(batch_name, data_number, value1.value, value2.value, url);
  try {
    message.loading('预处理需要10s左右，请耐心等待', 0);
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      imageUrl.value = URL.createObjectURL(blob);
      message.destroy()
    } else {
      message.error('图片加载失败');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    message.error('图片加载失败');
  }
};
</script>


<template>
  <a-space direction="vertical">
    <a-card title="数据预处理" style="width: 1500px">
      <a-space direction="horizontal">
        选择数据：<a-cascader v-model:value="selectedData" :options="dataOptions" placeholder="请选择数据文件" style="width: 180px"></a-cascader>
        加窗方式：<a-select v-model:value="value1" style="width: 120px">
          <a-select-option value="hamming">汉明窗</a-select-option>
          <a-select-option value="hanning">汉宁窗</a-select-option>
          <a-select-option value="blackman">布莱克曼窗</a-select-option>
        </a-select>
        静态杂波抑制：<a-select v-model:value="value2" style="width: 150px">
          <a-select-option value="median_filter">中值滤波</a-select-option>
          <a-select-option value="adaptive_filter">自适应滤波</a-select-option>
          <a-select-option value="subtract_mean">每个样本点减均值</a-select-option>
        </a-select>
        <a-button type="primary" @click="handleSubmit">预处理数据</a-button>
      </a-space>
      <img v-if="imageUrl" :src="imageUrl" alt="1" width="1400" height="450">
    </a-card>
  </a-space>
</template>

<style scoped>

</style>
