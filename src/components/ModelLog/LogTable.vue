<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          数据集
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>mAP 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const columns = [
  {
    title: '数据集',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '模型',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: '划分',
    dataIndex: 'partition',
    key: 'partition',
  },
  {
    title: '运行时间',
    dataIndex: 'runtime',
    key: 'runtime',
  },
  {
    title: 'F1值',
    dataIndex: 'f1',
    key: 'f1',
  },
  {
    title: '准确率',
    dataIndex: 'accuracy',
    key: 'accuracy',
  },
  {
    title: '精确率',
    dataIndex: 'precision',
    key: 'precision',
  },
  {
    title: '召回率',
    dataIndex: 'recall',
    key: 'recall',
  },
  {
    title: '操作',
    key: 'action',
  }
];


const data = [
  {
    key: '1',
    name: 'Dataset 1',
    model: 'model_1',
    partition: '6616c215d963e998a95c97de',
    runtime: '2024-04-14T04:06:29.262+00:00',
    f1: '0.81',
    accuracy: '0.86',  // 添加准确率数据
    precision: '0.83',  // 添加精确率数据
    recall: '0.79',     // 添加召回率数据
  },

];

</script>

