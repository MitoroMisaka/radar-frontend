<template>
  <div>
    <a-space direction="horizontal" size="large">
      <!-- Stereo Image 文件上传按钮 -->
      <div>
        <span>Stereo Image 文件：</span>
        <a-upload
            v-model:file-list="stereoImageFileList"
            name="stereo-image-file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleStereoImageFileChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </div>

      <!-- GT 文件上传按钮 -->
      <div>
        <span>GT 文件：</span>
        <a-upload
            v-model:file-list="gtFileList"
            name="gt-file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleGTFileChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </div>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const handleStereoImageFileChange = info => {
  handleFileChange(info, 'stereoImageFileList');
};

const handleGTFileChange = info => {
  handleFileChange(info, 'gtFileList');
};

const handleFileChange = (info, fileListName) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, this[fileListName]);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const stereoImageFileList = ref([]);
const gtFileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};
</script>
