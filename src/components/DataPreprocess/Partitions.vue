<template>
  <a-space direction="vertical">
    <a-card title="数据查看" style="width: 1200px">
      <a-list item-layout="horizontal" :data-source="partitions" class="partitions-list">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                :description="`测试集比例: ${item.test_size}  | 随机数种子: ${item.random_seed}`"
            >
              <template #title>
                <a>划分数据</a>
              </template>
            </a-list-item-meta>
            <a :href="generateDownloadLink(item)" key="download_partition">下载划分</a>
            <a  @click="deletePartition(item)" key="delete_partition">删除数据</a>
          </a-list-item>
        </template>
      </a-list>
    </a-card>

    <a-card title="创建划分" style="width: 1200px">
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
          <a-select
              v-model:value="testSize"
              style="width: 160px"
              :options="options1"
          ></a-select>
          <a-input prefix="随机数种子:" v-model:value="randomSeed" />
          <a-button @click="generateRandomSeed">生成随机数种子</a-button>
          <a-button type="primary" html-type="submit" @click="submitForm">提交划分</a-button>
        </a-space>
      </a-form>
    </a-card>
  </a-space>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from "ant-design-vue";

const router = useRouter();
const partitions = ref([]);
const testSizes = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9'];
const options1 = ref(testSizes.map(size => ({ value: size, label: '测试集比例：' + size })));
const testSize = ref(testSizes[0]);
const randomSeed = ref(0);

const generateRandomSeed = () => {
  const min = 100000;
  const max = 999999;
  randomSeed.value = Math.floor(Math.random() * (max - min + 1)) + min;
};

const batch_name = ref('');
const windowing_method = ref('');
const clutter_suppression_method = ref('');


onMounted(() => {
  console.log('Router query params:', router.currentRoute.value.query);
  fetchPartitionsData();
});

const submitForm = async () => {
  const formData = new FormData();
  formData.append('batch_name', batch_name.value);
  formData.append('windowing_method', windowing_method.value);
  formData.append('clutter_suppression_method', clutter_suppression_method.value);
  formData.append('test_size', testSize.value);
  formData.append('random_seed', randomSeed.value);

  try {
    const response = await fetch('http://127.0.0.1:5000/partition', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // 处理成功提交的情况
      message.success('划分创建成功');
      console.log('Partition creation successful');
      // 刷新数据
      partitions.value.push({
        random_seed: randomSeed.value,
        test_size: testSize.value
      });
    } else {
      message.error('划分创建失败', response.data.error);
      console.error('Error creating partition:', response.data.error);
    }
  } catch (error) {
    message.error('划分创建失败', error.message);
    console.error('Error creating partition:', error.message);
  }


};

const generateDownloadLink = (item) => {
  const url = `http://127.0.0.1:5000/download_partition/${batch_name.value}/${windowing_method.value}/${clutter_suppression_method.value}/?test_size=${item.test_size}&random_seed=${item.random_seed}`;
  return url;
};

const deletePartition = async (partition) => {
  const formData = new FormData();
  formData.append('batch_name', batch_name.value);
  formData.append('windowing_method', windowing_method.value);
  formData.append('clutter_suppression_method', clutter_suppression_method.value);
  formData.append('test_size', partition.test_size);
  formData.append('random_seed', partition.random_seed);

  try {
    const response = await fetch('http://127.0.0.1:5000/delete_partition', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // 处理成功删除的情况
      message.success('数据删除成功');
      console.log('Partition deletion successful');
      // 刷新数据
      partitions.value = partitions.value.filter(item => !(item.random_seed === partition.random_seed && item.test_size === partition.test_size));
    } else {
      message.error('数据删除失败', response.data.error);
      console.error('Error deleting partition:', response.data.error);
    }
  } catch (error) {
    message.error('数据删除失败', error.message);
    console.error('Error deleting partition:', error.message);
  }

};

const fetchPartitionsData = async () => {
  try {
    batch_name.value = router.currentRoute.value.query.batchName;

    if (router.currentRoute.value.query.windowingMethod === '汉明窗') {
      windowing_method.value = 'hamming';
    } else if (router.currentRoute.value.query.windowingMethod === '汉宁窗') {
      windowing_method.value = 'hanning';
    } else if (router.currentRoute.value.query.windowingMethod === '布莱克曼窗') {
      windowing_method.value = 'blackman';
    }
    if (router.currentRoute.value.query.clutterSuppressionMethod === '中值滤波') {
      clutter_suppression_method.value = 'median_filter';
    } else if (router.currentRoute.value.query.clutterSuppressionMethod === '自适应滤波') {
      clutter_suppression_method.value = 'adaptive_filter';
    } else if (router.currentRoute.value.query.clutterSuppressionMethod === '每个样本点减均值') {
      clutter_suppression_method.value = 'subtract_mean';
    }
    const randomSeeds = router.currentRoute.value.query.randomSeeds;
    const testSizes = router.currentRoute.value.query.testSizes;
    const partitionsData = randomSeeds.map((seed, index) => ({
      random_seed: seed,
      test_size: testSizes[index]
    }));
    partitions.value = partitionsData;
  } catch (error) {
    console.error('Error fetching partitions data:', error);
  }
};
</script>

<style scoped>
/* 样式 */
</style>
