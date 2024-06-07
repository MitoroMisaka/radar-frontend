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
<!--      # 提示词 提示下面的路径请用鼠标右键->复制地址获得（注意要有引号（单双即可），具体参考示例）-->
        <span>下面的路径请用鼠标右键->复制文件地址获得（注意要有引号（单双即可），具体参考示例，请自行保持文件一一对应）</span>
      <a-divider/>
      <div>
        <a-space direction="horizontal" size="large">
          <!-- 雷达参数文件路径输入框 -->
          <div>
            <span>雷达参数文件路径：(单个文件)</span>
            <a-input placeholder="'E:\config.json'" v-model:value="formState.radarFilePath" />
          </div>

          <!-- 传感器参数文件路径输入框 -->
          <div>
            <span>传感器参数文件路径：(单个文件)</span>
            <a-input placeholder="'E:\sensors_config.json'" v-model:value="formState.sensorFilePath" />
          </div>

          <!-- ADC文件夹路径输入框 -->
          <div>
            <span>ADC文件夹路径：（文件夹）</span>
            <a-input placeholder="'E:\ADC'" v-model:value="formState.adcFilesFolderPath" />
          </div>
        </a-space>
      </div>
    </a-card>
    <a-card title="相机数据" style="width: 1500px">
      <div>
        <a-space direction="horizontal" size="large">
          <!-- Stereo Image 文件夹路径输入框 -->
          <div>
            <span>Stereo Image 文件夹路径：（文件夹）</span>
            <a-input placeholder="'E:\stereo_image'" v-model:value="formState.stereoImageFilesFolderPath" />
          </div>

          <!-- GT 文件夹路径输入框 -->
          <div>
            <span>GT 文件夹路径：（文件夹）</span>
            <a-input placeholder="'E:\gt'" v-model:value="formState.gtFilesFolderPath" />
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
import { message, Modal } from "ant-design-vue";

export default {
  data() {
    return {
      formState: {
        batchname: '',
        introduction: '',
        radarFilePath: '',
        sensorFilePath: '',
        adcFilesFolderPath: '',
        stereoImageFilesFolderPath: '',
        gtFilesFolderPath: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        message.loading('上传中，请耐心等待', 0)
        // Get form data
        const formData = new FormData();
        formData.append('batch_name', this.formState.batchname);
        formData.append('description', this.formState.introduction);
        formData.append('config_file_path', this.formState.radarFilePath);
        formData.append('sensors_para_config_file_path', this.formState.sensorFilePath);
        formData.append('adc_files_folder', this.formState.adcFilesFolderPath);
        formData.append('stereo_image_files_folder', this.formState.stereoImageFilesFolderPath);
        formData.append('gt_files_folder', this.formState.gtFilesFolderPath);

        // Send POST request to server
        const response = await axios.post('http://127.0.0.1:5000/upload_rawdata_by_dir', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });


        // Handle server response
        if (response.data.message) {
          message.destroy()
          Modal.success({
            title: 'UPLOAD SUCCESS',
            content: response.data.message
          });
        } else {
          message.destroy()
          Modal.error({
            title: 'UPLOAD FAILED',
            content: response.data.error
          });
        }
      } catch (error) {
        message.destroy()
        Modal.error({
          title: 'UPLOAD FAILED',
          content: error.message
        });
      }
    },
  }
};
</script>
