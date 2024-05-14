<template>
  <div>
    <a-space direction="horizontal" size="large">
      <!-- 雷达参数文件上传按钮 -->
      <div>
        <span>雷达参数文件：</span>
        <a-upload
            v-model:file-list="radarFileList"
            name="radar-file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleRadarFileChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </div>

      <!-- 传感器参数文件上传按钮 -->
      <div>
        <span>传感器参数文件：</span>
        <a-upload
            v-model:file-list="sensorFileList"
            name="sensor-file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleSensorFileChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </div>

      <!-- ADC文件上传按钮 -->
      <div>
        <span>ADC文件：</span>
        <a-upload
            v-model:file-list="adcFileList"
            name="adc-file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleADCFileChange"
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

const handleRadarFileChange = info => {
  handleFileChange(info, radarFileList);
};

const handleSensorFileChange = info => {
  handleFileChange(info, sensorFileList);
};

const handleADCFileChange = info => {
  handleFileChange(info, adcFileList);
};

const handleFileChange = (info, fileListRef) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, fileListRef.value);
    // 更新文件列表的状态
    fileListRef.value = info.fileList;
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const radarFileList = ref([]);
const sensorFileList = ref([]);
const adcFileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};

const getConfigData = () => {
  return new Promise((resolve, reject) => {
    if (radarFileList.value.length > 0) {
      const file = radarFileList.value[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const configData = reader.result;
        console.log('Radar config data:', configData);
        resolve(configData);
      };
    } else {
      reject(new Error('No radar file selected'));
    }
  });
};

const getCameraData = () => {
  return new Promise((resolve, reject) => {
    if (sensorFileList.value.length > 0) {
      const file = sensorFileList.value[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const cameraData = reader.result;
        console.log('Camera data:', cameraData);
        resolve(cameraData);
      };
    } else {
      reject(new Error('No sensor file selected'));
    }
  });
};
</script>
<!--<script setup>-->
<!--import { ref } from 'vue';-->
<!--import { message } from 'ant-design-vue';-->

<!--const handleRadarFileChange = info => {-->
<!--  handleFileChange(info, 'radarFileList');-->
<!--};-->

<!--const handleSensorFileChange = info => {-->
<!--  handleFileChange(info, 'sensorFileList');-->
<!--};-->

<!--const handleADCFileChange = info => {-->
<!--  handleFileChange(info, 'adcFileList');-->
<!--};-->

<!--const handleFileChange = (info, fileListName) => {-->
<!--  if (info.file.status !== 'uploading') {-->
<!--    console.log(info.file, this[fileListName]);-->
<!--  }-->
<!--  if (info.file.status === 'done') {-->
<!--    message.success(`${info.file.name} file uploaded successfully`);-->
<!--  } else if (info.file.status === 'error') {-->
<!--    message.error(`${info.file.name} file upload failed.`);-->
<!--  }-->
<!--};-->

<!--const radarFileList = ref([]);-->
<!--const sensorFileList = ref([]);-->
<!--const adcFileList = ref([]);-->
<!--const headers = {-->
<!--  authorization: 'authorization-text',-->
<!--};-->
<!--</script>-->
