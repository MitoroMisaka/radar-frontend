<template>
  <a-space direction="vertical">
    <a-card title="基本信息" style="width: 1500px">
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
        <!-- Use a-space or a div to wrap the form items -->
        <a-space direction="horizontal">
          <a-form-item
              label="批次名"
              name="batchname"
              :rules="[{ required: true, message: '输入批次名' }]"
          >
            <a-input v-model:value="formState.batchname" />
          </a-form-item>

          <a-form-item
              label="简介"
              name="introduction"
              :rules="[{ required: true, message: '请输入简介' }]"
          >
            <a-input v-model:value="formState.introduction" />
          </a-form-item>
        </a-space>
      </a-form>
    </a-card>
    <a-card title="雷达数据" style="width: 1500px">
      <div>
        <a-space direction="horizontal" size="large">
          <!-- 雷达参数文件上传按钮 -->
          <div>
            <span>雷达参数文件：</span>
            <a-upload
                v-model:file-list="radarFileList"
                name="file"
                action="http://127.0.0.1:5000/upload"
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
                name="file"
                action="http://127.0.0.1:5000/upload"
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
                name="file"
                action="http://127.0.0.1:5000/upload"
                :headers="headers"
                @change="handleADCFileChange"
                directory>
              <a-button>
                <upload-outlined></upload-outlined>
                Upload Directory
              </a-button>
            </a-upload>
          </div>
        </a-space>
      </div>
    </a-card>
    <a-card title="相机数据" style="width: 1500px">
      <div>
        <a-space direction="horizontal" size="large">
          <!-- Stereo Image 文件上传按钮 -->
          <div>
            <span>Stereo Image 文件：</span>
            <a-upload
                v-model:file-list="stereoImageFileList"
                name="file"
                action="http://127.0.0.1:5000/upload"
                :headers="headers"
                @change="handleStereoImageFileChange"
                directory>
              <a-button>
                <upload-outlined></upload-outlined>
                Upload Directory
              </a-button>
            </a-upload>
          </div>

          <!-- GT 文件上传按钮 -->
          <div>
            <span>GT 文件：</span>
            <a-upload
                v-model:file-list="gtFileList"
                name="file"
                action="http://127.0.0.1:5000/upload"
                :headers="headers"
                @change="handleGTFileChange"
                directory>
              <a-button>
                <upload-outlined></upload-outlined>
                Upload Directory
              </a-button>
            </a-upload>
          </div>
        </a-space>
      </div>
    </a-card>
    <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
      <a-button type="primary" html-type="submit" @click="handleSubmit">Submit</a-button>
    </a-form-item>
  </a-space>
</template>

<script>
import axios from 'axios';
import {message, Modal} from "ant-design-vue";
import { UploadOutlined } from '@ant-design/icons-vue';

export default {
  data() {
    return {
      formState: {
        batchname: '',
        introduction: '',
      },
      radarFileUrl: '',
      sensorsFileUrl: '',
      adcFileUrlList: [],
      stereoImageFileUrlList: [],
      gtFileUrlList: [],
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Get form data
        const formData = {...this.formState};

        // Combine form data and file data into FormData object
        const combinedFormData = new FormData();
        combinedFormData.append('config_file', this.radarFileUrl);
        combinedFormData.append('sensors_para_config_file', this.sensorsFileUrl);
        combinedFormData.append('batch_name', formData.batchname);
        combinedFormData.append('description', formData.introduction);
        this.adcFileUrlList.forEach(file => {
          combinedFormData.append('adc_files', file);
        });
        this.stereoImageFileUrlList.forEach(file => {
          combinedFormData.append('stereo_image_files', file);
        });
        this.gtFileUrlList.forEach(file => {
          combinedFormData.append('gt_files', file);
        });

        // Send POST request to server
        const response = await axios.post('http://127.0.0.1:5000/upload_rawdata', combinedFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Handle server response
        if (response.data.message) {
          Modal.success({
            title: 'UPLOAD SUCCESS',
            content: response.data.message
          });
        } else {
          Modal.error({
            title: 'UPLOAD FAILED',
            content: response.data.error
          });
        }
      } catch (error) {
        Modal.error({
          title: 'UPLOAD FAILED',
          content: error.message
        });
      }
    },
    handleRadarFileChange(info) {
      if (info.file.status === 'done') {
        // 文件上传成功，获取文件的 URL
        this.radarFileUrl = info.file.originFileObj; // 假设后端返回的文件 URL 存在 response.url 中
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // 文件上传失败，清空文件 URL
        this.radarFileUrl = '';
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleSensorFileChange(info) {
      if (info.file.status === 'done') {
        // 文件上传成功，获取文件的 URL
        this.sensorsFileUrl = info.file.originFileObj; // 假设后端返回的文件 URL 存在 response.url 中
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // 文件上传失败，清空文件 URL
        this.sensorsFileUrl = '';
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleADCFileChange(info) {
      if (info.file.status === 'done') {
        // 文件上传成功，获取文件的 URL
        this.adcFileUrlList.push(info.file.originFileObj); // 假设后端返回的文件 URL 存在 response.url 中
        message.success(`${info.file.name} file uploaded successfully ,url is${info.file.response.url}`);
      } else if (info.file.status === 'error') {
        // 文件上传失败，清空文件 URL
        this.adcFileUrlList = [];
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleStereoImageFileChange(info) {
      if (info.file.status === 'done') {
        // 文件上传成功，获取文件的 URL
        this.stereoImageFileUrlList.push(info.file.originFileObj); // 假设后端返回的文件 URL 存在 response.url 中
        message.success(`${info.file.name} file uploaded successfully ,url is${info.file.response.url}`);
      } else if (info.file.status === 'error') {
        // 文件上传失败，清空文件 URL
        this.stereoImageFileUrlList = [];
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleGTFileChange(info) {
      if (info.file.status === 'done') {
        // 文件上传成功，获取文件的 URL
        this.gtFileUrlList.push(info.file.originFileObj); // 假设后端返回的文件 URL 存在 response.url 中
        message.success(`${info.file.name} file uploaded successfully ,url is${info.file.response.url}`);
      } else if (info.file.status === 'error') {
        // 文件上传失败，清空文件 URL
        this.gtFileUrlList = [];
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleFileChange(info, fileList) {

    }
  }
};
</script>
