<template>
  <a-space direction="vertical">
    <a-card title="数据查看" style="width: 1200px">
      <a-list
          class="demo-loadmore-list"
          :loading="initLoading"
          item-layout="horizontal"
          :data-source="list"
      >
        <template #renderItem="{ item, index }">
          <a-list-item>
            <template #actions>
              <a :href="`http://localhost:5000/download_rawdata/${item.batch_name}`" key="list-loadmore-download">下载原始数据</a>
              <!-- 修改点：使用 @click 事件进行页面导航 -->
              <a @click="viewPreprocessedData(item.batch_name)" key="list-loadmore-view">查看预处理数据</a>
              <a @click="deleteDocument(item.batch_name, index)" key="list_loadmore_delete">删除原始数据</a>
            </template>
            <a-skeleton :title="false" :loading="!!item.loading" active>
              <a-list-item-meta
                  :description="item.description"
              >
                <template #title>
                  <a>{{ item.batch_name }}</a>
                </template>
              </a-list-item-meta>

            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </a-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {message} from "ant-design-vue";

const router = useRouter();

const fakeDataUrl = `http://127.0.0.1:5000/get_all`;

const initLoading = ref(true);
const data = ref([]);
const list = ref([]);

onMounted(() => {
  fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        initLoading.value = false;
        data.value = res;
        list.value = data.value;
      });
});

// 修改点：定义查看预处理数据的方法，实现页面导航
const viewPreprocessedData = (batchName) => {
  router.push(`/preprocessed-data/${batchName}`);
};

const deleteDocument = (batchName, index) => {
  const deleteUrl = `http://127.0.0.1:5000/delete_document/${batchName}`;
  fetch(deleteUrl, {
    method: 'POST',
  })
      .then((res) => res.json())
      .then((res) => {
        // 显示接口返回的消息
        message.success(res.success);
        // 更新列表或执行其他操作
        list.value.splice(index, 1);
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
        message.error(error);
      });
};
</script>


