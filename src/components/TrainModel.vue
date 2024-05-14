<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {message} from "ant-design-vue";

const selectedModel = ref('');
const selectedData = ref('');
const batchSize = ref(1);
const epoch = ref(1);
const dataOptions = ref([]);
const modelOptions = ref([]);

// 在组件加载时调用接口
onMounted(() => {
  fetchData();
});

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('model_id', selectedModel.value[1]);
    formData.append('train_set_id', selectedData.value[2]);
    formData.append('epoch', String(epoch.value));
    formData.append('batch_size', String(batchSize.value));
    message.loading('模型训练中,请耐心等待', 0)
    const response = await fetch('http://127.0.0.1:5000/mock_train_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      message.destroy()
      message.success('模型训练成功');
    } else {
      message.error('模型训练失败');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    message.error('提交表单失败');
  }
};
const handleSubmitReal = async () => {
  try {
    const formData = new FormData();
    formData.append('model_id', selectedModel.value[1]);
    formData.append('train_set_id', selectedData.value[2]);
    formData.append('epoch', String(epoch.value));
    formData.append('batch_size', String(batchSize.value));
    message.loading('模型训练中,请耐心等待', 0)
    const response = await fetch('http://127.0.0.1:5000/train_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      message.destroy()
      message.success('模型训练成功');
    } else {
      message.error('模型训练失败');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    message.error('提交表单失败');
  }
};

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get_train_set');
    const data = await response.json();
    dataOptions.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
    message.error('获取数据失败');
  }
  try {
    const response = await fetch('http://127.0.0.1:5000/get_model_list');
    const data = await response.json();
    modelOptions.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
    message.error('获取数据失败');
  }
};
</script>

<template>
  <a-space direction="vertical" style="margin-bottom: 16px;">
    <a-card title="模型训练" style="width: 1500px">
      <a-typography-title :level="4">模型选择</a-typography-title>
      <a-cascader v-model:value="selectedModel" :options="modelOptions" expand-trigger="hover" placeholder="Please select" style="width: 250px"/>

      <a-typography-title :level="4" style="margin-top: 16px;">数据选择</a-typography-title>
      <a-cascader v-model:value="selectedData" :options="dataOptions" expand-trigger="hover" placeholder="Please select" style="width: 250px"/>

      <a-typography-title :level="4" style="margin-top: 16px;">BatchSize</a-typography-title>
      <div>
        <a-input-number v-model:value="batchSize" :min="1" :max="50" />
        当前值：{{ batchSize }}
      </div>

      <a-typography-title :level="4" style="margin-top: 16px;">Epoch</a-typography-title>
      <div>
        <a-input-number v-model:value="epoch" :min="1" :max="100" />
        当前值：{{ epoch }}
      </div>

      <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="margin-top: 16px;">
        <a-button type="primary" @click="handleSubmit" html-type="submit">模拟训练</a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="margin-top: 16px;">
        <a-button  @click="handleSubmitReal" html-type="submit">训练模型（有CUDA请选这个）</a-button>
      </a-form-item>
    </a-card>
  </a-space>
</template>

<style scoped>
</style>
