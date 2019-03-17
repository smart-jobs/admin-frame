<template>
  <el-container class="layout" direction="vertical">
    <el-header class="header" :height="layout.headerHeight" :style="{ lineHeight: layout.headerHeight }">
      <div class="header-box">
        <naf-logo :width="asideWidth" :shortName="shortName" />
        <naf-lite-bar :menu-collapse="menuCollapse" @toggle-menu="toggleMenu" />
      </div>
    </el-header>
    <el-main style="padding: 0;display: flex;">
      <el-container class="main">
        <el-aside :width="asideWidth" class="sider" v-show="asideShow">
          <naf-sider :menu-items="menuItems" :style="{ width: asideWidth }" theme="light" :is-collapse="menuCollapse" />
        </el-aside>
        <el-main class="content">
          <div class="bread" :height="layout.breadHeight" v-show="asideShow">
            <naf-bread></naf-bread>
          </div>
          <div class="page" ref="pageContainer">
            <el-alert :title="errMsg" type="info" :description="errDesc" show-icon v-if="showError"> </el-alert>
            <router-view v-else />
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import config from '@frame/config';
import NafSider from '@naf/frame/sider';
import NafLogo from './logo';
import NafLiteBar from './litebar';
import NafBread from './bread';

const defaultConfig = {
  breadHeight: '24px',
  headerHeight: '64px',
  footerHeight: '48px',
  asideExpandWidth: '256px',
  asideCollapseWidth: '64px',
};

const { layout = {} } = config;

export default {
  name: 'Frame',
  components: {
    NafSider,
    NafLogo,
    NafLiteBar,
    NafBread,
  },
  props: {
    menuItems: { type: Array, required: true },
    shortName: { type: String, default: '智慧就业' },
    // menuCollapse: { type: Boolean, default: false },
  },
  data() {
    return {
      layout: { ...defaultConfig, ...layout },
      showError: false,
      errMsg: '',
      errDesc: '',
      menuCollapse: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuCollapse = !this.menuCollapse;
    },
  },
  computed: {
    asideWidth() {
      return this.menuCollapse ? layout.asideCollapseWidth : layout.asideExpandWidth;
    },
    asideShow() {
      return true;
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    // if (!dd) {
    //   throw new BusinessError();
    // }
  },
  errorCaptured(err, vm, info) {
    this.showError = true;
    this.errMsg = err.message || '处理发生错误';
    this.errDesc = err.details || info || '页面加载过程中发生错误';
  },
};
</script>
<style scoped lang="less">
.layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.header {
  padding: 0;
  .header-box {
    background: #20a0ff;
    color: #fff;
    display: flex;
    flex-direction: row;
    padding: 0;
    height: 100%;
  }
}
.sider {
  background: #fff;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: solid 1px #e6e6e6;
}
.main {
  // FOR EDGE
  overflow: hidden;
}
.content {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  .bread {
    padding: 10px 20px;
  }
  .page {
    flex: 1;
    overflow: auto;
    display: block;
    padding: 10px;
  }
}
</style>
