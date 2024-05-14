// router/index.js

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/data-view',
        name: 'DataView',
        component: () => import('../components/DataView.vue'),
    },
    {
        path: '/model-view',
        name: 'ModelView',
        component: () => import('../components/ModelView.vue'),
    },
    {
        path: '/data-preprocess',
        name: 'DataPreprocess',
        component: () => import('../components/DataPreprocess.vue'),
    },
    {
        path: '/models',
        name: 'Models',
        component: () => import('../components/Models.vue'),
    },
    {
        path: "/train-model",
        name: "TrainModel",
        component: () => import("../components/TrainModel.vue"),
    },
    {
        path: "/run-model",
        name: "RunModel",
        component: () => import("../components/RunModel.vue"),
    },
    {
        path: "/model-log",
        name: "ModelLog",
        component: () => import("../components/ModelLog.vue"),
    },
    {
        path: "/preprocessed-data/:batchName", // 新增路由，使用动态路由参数来接收批次名
        name: "PreprocessedData",
        component: () => import("../components/DataPreprocess/PreprocessedData.vue"), // 假设你有一个名为PreprocessedData.vue的组件来展示预处理数据
    },
    {
        path: '/partitions',
        name: 'Partitions',
        component: () => import("../components/DataPreprocess/Partitions.vue"),
    }
    // Add more routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
