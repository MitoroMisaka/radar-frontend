<template>
  <a-space direction="vertical" style="margin-bottom: 16px;">
    <a-card title="模型查看" style="width: 1500px" direction="horizontal">
      <!-- 表单 -->
      <a-space direction="horizontal">
        <!-- 模型名称输入框 -->
        <a-input v-model:value="modelName" placeholder="模型名称"></a-input>
        <!-- 模型简介输入框 -->
        <a-input v-model:value="modelIntroduction" placeholder="模型简介"></a-input>
        上传模型：
        <a-upload
            v-model:file-list="fileList"
            name="file"
            action="http://127.0.0.1:5000/upload"
            :headers="headers"
            @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
        <a-button type="primary" @click="handleSubmit">上传模型</a-button>
      </a-space>

      <!-- 分隔线 -->
      <a-divider />

      <!-- 表格 -->
      <a-table :columns="columns" :data-source="models">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              <smile-outlined />
              Name
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
              <a @click="handleDelete(record.name, record.version)">删除模型</a>
              <a-divider type="vertical" />
               <a :href="`http://127.0.0.1:5000/download_model?name=${record.name}&version=${record.version}`">下载模型</a>
<!--              <a-divider type="vertical" />-->
<!--              <a @click="handleDelete(record.name, record.version)">info</a>-->
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </a-space>
</template>

<script setup>
import { SmileOutlined, DownOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

// 模型名称和简介的数据绑定
const modelName = ref('');
const modelIntroduction = ref('');
const headers = {
  authorization: 'authorization-text',
};
const fileList = ref([]);
let file = null; // 仅保留一个文件变量，而不是文件列表
const models = ref([]); // 用于存储从接口获取的模型数据

const handleDelete = async (modelName, modelVersion) => {
  try {
    const formData = new FormData();
    formData.append('name', modelName);
    formData.append('version', modelVersion);

    const response = await fetch('http://127.0.0.1:5000/delete_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      message.success('模型删除成功');
      // 删除成功后重新获取模型数据
      await getModels();
    } else {
      message.error('模型删除失败');
    }
  } catch (error) {
    console.error('Error deleting model:', error);
    message.error('模型删除失败');
  }
};

// 处理提交事件
const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('name', modelName.value);
    formData.append('description', modelIntroduction.value);
    formData.append('model_file', file); // 直接添加单个文件到 FormData 中

    const response = await fetch('http://127.0.0.1:5000/upload_model', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      message.success('模型上传成功');
      await getModels();
    } else {
      message.error('模型上传失败');
    }
  } catch (error) {
    console.error('Error uploading model:', error);
    message.error('模型上传失败');
  }
};

// 处理文件上传状态变化
const handleChange = (info) => {
  if (info.file.status === 'done') {
    // 获取二进制文件数据
    const binaryData = info.file.originFileObj;

    // 更新 file 变量
    file = binaryData;

    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

// 获取模型数据
const getModels = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/get_models');
    if (response.data.success) {
      // 将获取到的模型数据赋值给 models 变量
      models.value = response.data.models;
    } else {
      message.error('获取模型数据失败');
    }
  } catch (error) {
    console.error('Error fetching models:', error);
    message.error('获取模型数据失败');
  }
};

// 组件挂载时获取模型数据
onMounted(() => {
  getModels();
});

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Introduction',
    dataIndex: 'introduction',
    key: 'introduction',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
</script>
