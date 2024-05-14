<template>
  <a-layout-header :style="headerStyle">
    <img src="@/components/icons/radar.png" alt="Radar Icon" class="radar-icon" />
    <span class="header-text">雷达仿真评估及数据管理平台</span>
  </a-layout-header>
</template>

<script>
export default {
  data() {
    return {
      headerStyle: {
        background: '#fff', // Set your desired background color
        color: 'black', // Set your desired text color
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
      },
    };
  },
};
</script>

<style scoped>
.radar-icon {
  width: 60px; /* Set your desired width for the radar icon */
  height: 60px; /* Set your desired height for the radar icon */
  margin-right: 10px;
}

.header-text {
  font-size: 24px; /* Set your desired font size */
  font-weight: bold;
}
</style>
