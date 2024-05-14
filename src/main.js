import './assets/main.css'

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App.vue';
import 'ant-design-vue/dist/reset.css';
import router from './router/index.js';

const app = createApp(App);

app.use(router)

app.use(Antd).mount('#app');
