<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">

    <a-layout>
      <a-layout-header :style="headerStyle">
        <Head/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider :style="siderStyle">
          <Aside/>
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>

    </a-layout>

  </a-space>
</template>
<script lang="ts" setup>
import Aside from './components/Aside.vue';
import Head from './components/Head.vue';
import ModelView from './components/ModelView.vue';
import type { CSSProperties } from 'vue';
import Content from "@/components/ModelView.vue";
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
};
</script>

