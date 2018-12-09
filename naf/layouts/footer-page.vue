<!--登录页面布局，只有footer-->
<template>
  <el-container class="layout" direction="vertical">
    <el-main style="padding: 0;display: flex;">
      <transition name="form-fade" mode="in-out">
        <slot></slot>
      </transition>
    </el-main>
    <el-footer class="footer" height="layout.footerHeight">
      <slot name="footer">
        <naf-footer></naf-footer>
      </slot>
    </el-footer>
  </el-container>
</template>
<script>
import NafFooter from '@naf/frame/footer';
import config from '@frame/config';

const { layout } = config;

export default {
  components: {
    NafFooter,
  },
  data() {
    return {
      layout,
    };
  },
};
</script>
