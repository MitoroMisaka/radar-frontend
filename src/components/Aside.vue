<template>
  <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :items="items"
      @click="handleClick"
  ></a-menu>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from 'vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('数据管理', 'sub1', () => h(MailOutlined), [
    getItem('数据上传', '1'),
    getItem('数据查看', '2'),
    getItem('数据预处理', '3'),
  ]),

  getItem('模型管理', 'sub2', () => h(AppstoreOutlined), [
    getItem('模型查看', '4'),
    getItem('模型训练', '5'),
    getItem('模型评估', '6'),
    // getItem('模型日志', '7'),
  ]),
]);

const router = useRouter();

const handleClick: MenuProps['onClick'] = e => {
  const { key } = e;
  console.log('click', key);

  // 根据点击的 key 触发路由导航
  switch (key) {
    case '1':
      router.push('/model-view');
      break;
    case '2':
      router.push('/data-view');
      break;
    case '3':
      router.push('/data-preprocess');
      break;
    case '4':
      router.push('/models');
      break;
    case '5':
      router.push('/train-model');
      break;
    case '6':
      router.push('/run-model');
      break;
    // case '7':
    //   router.push('/model-log');
    //   break;
    default:
      break;
  }
};

watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>
