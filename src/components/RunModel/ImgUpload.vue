<template>
  <a-upload
      v-model:file-list="fileList"
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="headers"
      @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const fileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};
</script>

