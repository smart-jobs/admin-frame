<template>
  <el-container class="layout" direction="vertical">
    <el-header class="header" :height="layout.headerHeight" :style="{lineHeight: layout.headerHeight}">
      <naf-header :short-name="name" :logo-width="asideWidth" :menu-collapse="menuCollapse" :nav-mode="navMode"
                  @toggle-menu="toggleMenu" @switch-mode="switchMode" :menu-items="navModules" />
    </el-header>
    <el-main style="padding: 0;display: flex;">
      <el-container class="main">
        <el-aside :width="asideWidth" class="sider">
          <el-scrollbar>
            <naf-sider :menu-items="menuItems" :style="{width: asideWidth}" theme="light" :is-collapse="menuCollapse" />
          </el-scrollbar>
        </el-aside>
        <el-main class="content">
          <div class="bread" :height="layout.breadHeight">
            <naf-bread></naf-bread>
          </div>
          <div class="page">
            <router-view v-if="$route.path == '/'"/>
            <iframe v-else width="100%" height="100%" frameborder="0"></iframe>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import urljoin from 'url-join';
import { createNamespacedHelpers } from 'vuex';
import config from '@frame/config';
import NafHeader from '@/frame/header';
import NafSider from '@/frame/sider';
import NafBread from '@/frame/bread';
import * as types from '@/store/naf/.menu';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('naf/menu');

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
    NafHeader,
    NafSider,
    NafBread,
  },
  data() {
    return {
      name: config.shortName,
      layout: { ...defaultConfig, ...layout },
    };
  },
  methods: {
    ...mapMutations({
      toggleMenu: types.NAV_TOGGLE_COLLAPSE,
    }),
    ...mapActions(['switchMode']),
  },
  computed: {
    ...mapState({
      navMode: 'mode',
      navModule: 'current',
      navModules: 'modules',
      menuCollapse: 'collapse',
      items: 'items',
    }),
    asideWidth() {
      return this.menuCollapse ? layout.asideCollapseWidth : layout.asideExpandWidth;
    },
    menuItems() {
      let items = this.items || [];
      if (this.navMode == 'nested') {
        items = items.filter(p => p.options.module == this.navModule);
      }
      return items;
    },
    routerPath() {
      const { module = '', path = '/' } = this.$route.params;
      const { base } = this.$router.options;
      return urljoin(base, module, path);
    },
  },
  errorCaptured(err, vm, info) {
    console.log(typeof err);
    // eslint-disable-next-line valid-typeof
    if (typeof err === 'BusinessError') {
      this.$notify({
        title: '请求失败',
        message: err.message || '处理发生错误',
        type: 'error',
      });

      return false;
    }
  },
};
</script>
<style scoped lang="less">
.layout {
  overflow: hidden;
  .header {
    padding: 0;
  }
  .sider {
    background: #fff;
    max-height: 100%;
    overflow: initial;
    overflow-y: auto;
    border-right: solid 1px #e6e6e6;
    /*.el-menu {
      height: 100%;
    }*/
    .el-scrollbar {
      height: 100%;
      /deep/ .el-scrollbar__wrap {
        // margin-right: 0 !important;
        overflow-x: hidden;
      }
    }
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
      padding: 10px;
    }
    .page {
      flex: 1;
    }

    .el-scrollbar {
      height: 100%;
      widows: 100%;
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
        display: flex;
      }
      /deep/ .el-scrollbar__view {
        padding: 10px;
        display: flex;
        flex: 1;
        flex-direction: column;
        // overflow: auto;
      }
    }
  }
}
</style>
