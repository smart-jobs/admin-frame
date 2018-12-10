<!--登录页面布局，只有footer-->
<template functional>
  <el-scrollbar class="scroll-page">
    <slot></slot>
  </el-scrollbar>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
.el-scrollbar.scroll-page {
  height: 100%;
  width: 100%;
  & > .el-scrollbar__wrap {
    overflow-x: hidden;
    display: flex;
    & > .el-scrollbar__view {
      padding: 10px;
      display: flex;
      flex: 1;
      // flex-direction: column;
      // overflow: auto;
    }
  }
}
</style>
