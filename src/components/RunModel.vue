<script setup lang="ts">
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";

const selectedModel = ref('');
const selectedData = ref('');
const dataOptions = ref([]);
const modelOptions = ref([]);
const evaluationResult = ref('');
const total_loss_mean = ref('');
const box_loss_mean = ref('');
const category_loss_mean = ref('');
const conf_loss_mean = ref('');
const mean_ap_test = ref('');
const model_name = ref('');
const test_data = ref('');
const mAP_data = ref([]);
const columns = [
  { title: 'AP', dataIndex: 'AP', key: 'AP' },
  { title: 'mAP', dataIndex: 'mAP', key: 'mAP' },
  { title: 'Person', dataIndex: 'person', key: 'person' },
  { title: 'Bicycle', dataIndex: 'bicycle', key: 'bicycle' },
  { title: 'Car', dataIndex: 'car', key: 'car' },
  { title: 'Motorcycle', dataIndex: 'motorcycle', key: 'motorcycle' },
  { title: 'Bus', dataIndex: 'bus', key: 'bus' },
  { title: 'Truck', dataIndex: 'truck', key: 'truck' }
];

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get_test_set');
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

const dataSource = async () =>{
  const keys = Object.keys(test_data.value);
  const data = keys.map(key => {
    const item = test_data.value[key];
    return {
      key,
      AP: key,
      mAP: item.mAP,
      person: item.person,
      bicycle: item.bicycle,
      car: item.car,
      motorcycle: item.motorcycle,
      bus: item.bus,
      truck: item.truck
    };
  });
  mAP_data.value = data;
}

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('model_id', selectedModel.value[1]);
    formData.append('test_set_id', selectedData.value[2]);
    message.loading('模型评估中,请耐心等待', 0)
    const response = await fetch('http://127.0.0.1:5000/mock_test_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      evaluationResult.value = data;

      total_loss_mean.value = data.total_loss_mean;
      box_loss_mean.value = data.box_loss_mean;
      category_loss_mean.value = data.category_loss_mean;
      conf_loss_mean.value = data.conf_loss_mean;
      mean_ap_test.value = data.mean_ap_test;
      model_name.value = data.model_name;
      test_data.value = JSON.parse(data.test_data);
      test_data.value = JSON.parse(test_data.value);
      console.log(data.test_data);
      console.log(test_data.value);
      console.log(test_data.value['AP_0.10']);

      console.log(data);
      await dataSource();

      message.destroy()
      message.success('模型评估成功');
    } else {
      message.error('模型评估失败');
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
    formData.append('test_set_id', selectedData.value[2]);
    message.loading('模型评估中,请耐心等待', 0)
    const response = await fetch('http://127.0.0.1:5000/test_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      evaluationResult.value = data;

      total_loss_mean.value = data.total_loss_mean;
      box_loss_mean.value = data.box_loss_mean;
      category_loss_mean.value = data.category_loss_mean;
      conf_loss_mean.value = data.conf_loss_mean;
      mean_ap_test.value = data.mean_ap_test;
      model_name.value = data.model_name;
      test_data.value = JSON.parse(data.test_data);
      test_data.value = JSON.parse(test_data.value);
      console.log(data.test_data);
      console.log(test_data.value);
      console.log(test_data.value['AP_0.10']);

      console.log(data);
      await dataSource();

      message.destroy()
      message.success('模型评估成功');
    } else {
      message.error('模型评估失败');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    message.error('提交表单失败');
  }
};
</script>


<template>
  <a-space direction="vertical" style="margin-bottom: 30px;">
    <a-card title="模型评估" style="width: 1500px">
      <a-typography-title :level="4">模型</a-typography-title>
      <a-space direction="horizontal">
        选择模型：
        <a-cascader v-model:value="selectedModel" :options="modelOptions" expand-trigger="hover" placeholder="Please select" style="width: 250px"/>
        <!-- Add more elements as needed -->
      </a-space>
      <a-divider/>
      <a-typography-title :level="4">运行测试集</a-typography-title>
      <a-space direction="horizontal">
        选择测试集：
        <a-cascader v-model:value="selectedData" :options="dataOptions" expand-trigger="hover" placeholder="Please select" style="width: 250px"/>
        <!-- Add more elements as needed -->
      </a-space>
      <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="margin-top: 16px;">
        <a-button type="primary" @click="handleSubmit" html-type="submit">模拟评估</a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="margin-top: 16px;">
        <a-button  @click="handleSubmitReal" html-type="submit">模型评估（有CUDA请选这个）</a-button>
      </a-form-item>
      <a-divider/>
      <div>
        <a-row>
          <a-col :span="4">
            <a-statistic title="模型名称" :value="model_name" style="margin-right: 50px" />
          </a-col>
          <a-col :span="4">
            <a-statistic title="总体损失平均" :value="total_loss_mean" style="margin-right: 50px" />
          </a-col>
          <a-col :span="4">
            <a-statistic title="边界框损失平均" :value="box_loss_mean" style="margin-right: 50px" />
          </a-col>
          <a-col :span="4">
            <a-statistic title="类别损失平均" :value="category_loss_mean" style="margin-right: 50px" />
          </a-col>
          <a-col :span="4">
            <a-statistic title="置信度损失平均" :value="conf_loss_mean" style="margin-right: 50px" />
          </a-col>
          <a-col :span="4">
            <a-statistic title="平均精度" :value="mean_ap_test" style="margin-right: 50px" />
          </a-col>
        </a-row>
      </div>
      <a-divider/>
      <a-table :columns="columns" :data-source="mAP_data" bordered>
        <template slot="title">
          数据评估结果
        </template>
      </a-table>
    </a-card>

  </a-space>
</template>


<style scoped>

</style>