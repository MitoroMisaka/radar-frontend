<template>
  <a-space direction="vertical">
    <a-card title="数据查看" style="width: 1200px">
      <a-list item-layout="horizontal" :data-source="preprocessedData" class="preprocessed-list">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                :description="`加窗方式: ${item.windowing_method}  | 静态杂波抑制: ${item.clutter_suppression_method}`"
            >
              <template #title>
                <a>{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            <a :href="downloadPreprocessedData(item)" key="download">下载预处理数据</a>
            <a @click="viewPartitions(item,item.partitions)" key = "partitions">查看划分</a>
            <a @click="deletePreprocessedData(item)" key="delete">删除预处理数据</a>
          </a-list-item>
        </template>
      </a-list>
    </a-card>

    <a-card title="预处理数据" style="width: 1200px">
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 12 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          direction="horizontal"
      >
        <a-space direction="horizontal">
          窗函数：<a-select
              v-model:value="windowing"
              style="width: 150px"
              :options="windowing_options"
          ></a-select>
          静态杂波抑制：<a-select
            v-model:value="clutter_suppression"
            style="width: 180px"
            :options="clutter_suppression_options"
            option-label-prop="label"
        ></a-select>
          <a-button type="primary" html-type="submit" @click="submitForm">预处理</a-button>
        </a-space>
      </a-form>
    </a-card>
  </a-space>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {message, Modal} from "ant-design-vue";

const router = useRouter();
const preprocessedData = ref([]);
const batch_name = ref('');
const windowing_method = ref('');
const clutter_suppression_method = ref('');
const windowing_options = [
  { label: '汉明窗', value: 'hamming' },
  { label: '汉宁窗', value: 'hanning' },
  { label: '布莱克曼窗', value: 'blackman' }
];
const clutter_suppression_options = [
  { label: '中值滤波', value: 'median_filter' },
  { label: '自适应滤波', value: 'adaptive_filter' },
  { label: '每个样本点减均值', value: 'subtract_mean' }
];
const windowing = ref('')
const clutter_suppression = ref('')

onMounted(() => {
  const { batchName } = router.currentRoute.value.params;
  batch_name.value = batchName;
  fetchPreprocessedData(batchName);
});

const fetchPreprocessedData = async (batchName) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_preprocessed_data/${batchName}`);
    const responseData = await response.json();
    preprocessedData.value = responseData.preprocessed_data.map((data, index) => ({
      title: `预处理数据 ${index + 1}`,
      windowing_method: data.windowing_method,
      clutter_suppression_method: data.clutter_suppression_method,
      partitions: data.partitions
    }));
  } catch (error) {
    console.error('Error fetching preprocessed data:', error);
  }
};

const viewPartitions = (item, partitions) => {
  windowing_method.value = item.windowing_method;
  clutter_suppression_method.value = item.clutter_suppression_method;
  // 提取每个预处理数据下的随机数种子和测试集比例
  const randomSeeds = partitions.map(partition => partition.random_seed);
  const testSizes = partitions.map(partition => partition.test_size);
  console.log('Random seeds:', randomSeeds);
  console.log('Test sizes:', testSizes);

  // 跳转到展示划分数据的页面，并将随机数种子和测试集比例作为参数传递
  router.push({
    name: 'Partitions',
    query: {
      windowingMethod: windowing_method.value,
      clutterSuppressionMethod: clutter_suppression_method.value,
      batchName: batch_name.value,
      randomSeeds: randomSeeds,
      testSizes: testSizes
    }
  });
};

const downloadPreprocessedData = (item) => {
  const { windowing_method, clutter_suppression_method } = item;
  let translatedWindowingMethod, translatedClutterSuppressionMethod;

  if (windowing_method === "汉宁窗") {
    translatedWindowingMethod = "hanning";
  } else if (windowing_method === "汉明窗") {
    translatedWindowingMethod = "hamming";
  } else if (windowing_method === "布莱克曼窗") {
    translatedWindowingMethod = "blackman";
  }

  if (clutter_suppression_method === "中值滤波") {
    translatedClutterSuppressionMethod = "median_filter";
  } else if (clutter_suppression_method === "自适应滤波") {
    translatedClutterSuppressionMethod = "adaptive_filter";
  } else if (clutter_suppression_method === "每个样本点减均值") {
    translatedClutterSuppressionMethod = "subtract_mean";
  }

  const url = `http://127.0.0.1:5000/download_preprocessed_data/${batch_name.value}/${translatedWindowingMethod}/${translatedClutterSuppressionMethod}`;
  return url;
};

const deletePreprocessedData = async (item) => {
  const { windowing_method, clutter_suppression_method } = item;
  let translatedWindowingMethod, translatedClutterSuppressionMethod;

  if (windowing_method === "汉宁窗") {
    translatedWindowingMethod = "hanning";
  } else if (windowing_method === "汉明窗") {
    translatedWindowingMethod = "hamming";
  } else if (windowing_method === "布莱克曼窗") {
    translatedWindowingMethod = "blackman";
  }

  if (clutter_suppression_method === "中值滤波") {
    translatedClutterSuppressionMethod = "median_filter";
  } else if (clutter_suppression_method === "自适应滤波") {
    translatedClutterSuppressionMethod = "adaptive_filter";
  } else if (clutter_suppression_method === "每个样本点减均值") {
    translatedClutterSuppressionMethod = "subtract_mean";
  }

  try {
    await fetch(`http://127.0.0.1:5000/delete_preprocessed_data/${batch_name.value}/${translatedWindowingMethod}/${translatedClutterSuppressionMethod}`, {
      method: 'POST'
    });
    message.success('数据删除成功')
    console.log('Preprocessed data deleted successfully');
    // Remove the deleted item from the list
    preprocessedData.value = preprocessedData.value.filter(data => data !== item);
  } catch (error) {
    message.error('数据删除失败', error.message);
    console.error('Error deleting preprocessed data:', error);
  }
};

const submitForm = async () => {
  let translatedWindowingMethod;
  if (windowing.value === 'hamming') {
    translatedWindowingMethod = '汉明窗';
  } else if (windowing.value === 'hanning') {
    translatedWindowingMethod = '汉宁窗';
  } else if (windowing.value === 'blackman') {
    translatedWindowingMethod = '布莱克曼窗';
  }

// 将英文静态杂波抑制方式转换为中文
  let translatedClutterSuppressionMethod;
  if (clutter_suppression.value === 'median_filter') {
    translatedClutterSuppressionMethod = '中值滤波';
  } else if (clutter_suppression.value === 'adaptive_filter') {
    translatedClutterSuppressionMethod = '自适应滤波';
  } else if (clutter_suppression.value === 'subtract_mean') {
    translatedClutterSuppressionMethod = '每个样本点减均值';
  }

  console.log(preprocessedData.value[0]?.windowing_method, preprocessedData.value[0]?.clutter_suppression_method);
  console.log(translatedWindowingMethod, translatedClutterSuppressionMethod);
  // 检查 windowing 和 clutter_suppression 是否已经存在
  const isExist = preprocessedData.value.some(data => {
    return data.windowing_method === translatedWindowingMethod && data.clutter_suppression_method === translatedClutterSuppressionMethod;
  });

  if (isExist) {
    // 如果已经存在，通过 Modal 弹窗提醒用户已存在
    Modal.warning({
      title: '已存在',
      content: '所选的加窗方式和静态杂波抑制方式已经存在，请选择其他方式。',
    });
    return; // 停止继续执行
  }
  try {
    const response = await fetch(`http://127.0.0.1:5000/preprocess/${batch_name.value}/${windowing.value}/${clutter_suppression.value}`, {
      method: 'POST',
    });
    console.log(response);
    if (response.ok) {
      // 处理成功提交的情况
      message.success('预处理成功');
      console.log('Preprocessing successful');
      // 刷新数据
      // preprocessedData.value.push({
      //   title: `预处理数据 ${preprocessedData.value.length + 1}`,
      //   windowing_method: translatedWindowingMethod,
      //   clutter_suppression_method: translatedClutterSuppressionMethod
      // });
      await fetchPreprocessedData(batch_name.value);
    } else {
      message.error('预处理失败', response.data.error);
      console.error('Error preprocessing:', response.data.error);
    }
  } catch (error) {
    message.error('预处理失败', error.message);
    console.error('Error preprocessing:', error.message);
  }
};
</script>

<style scoped>
.preprocessed-list {
  color: black;
}
</style>
