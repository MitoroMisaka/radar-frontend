<template>
  <a-space direction="vertical" >
  <a-card title="数据选择" style="width: 300px" direction="vertical" >
    数据集：
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        数据集1
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">数据集2</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">数据集3</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">数据集4</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <br>
    <a-checkbox  value="1">数据1</a-checkbox>
    <br>
    <a-checkbox  value="2">数据2</a-checkbox>
    <br>
    <a-checkbox  value="3">数据3</a-checkbox>
    <br>
    <a-checkbox  value="4">数据4</a-checkbox>
    <br>
    <a-checkbox  value="5">数据5</a-checkbox>
    <br>
    <a-checkbox  value="6">数据6</a-checkbox>
    <br>
    <a-checkbox  value="7">数据7</a-checkbox>
    <br>
    <a-checkbox  value="8">数据8</a-checkbox>
    <br>
    <a-checkbox  value="9">数据9</a-checkbox>
    <br>
    <a-checkbox  value="10">数据10</a-checkbox>
    <br>
    <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
      <a-button type="primary" html-type="submit">查看并保存结果</a-button>
    </a-form-item>
  </a-card>
  </a-space>
</template>

<script>
import { Checkbox, Card, Dropdown, Menu } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    'a-card': Card,
    'a-checkbox': Checkbox,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>

