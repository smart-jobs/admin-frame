<template>
  <el-container class="layout" direction="vertical">
    <el-header class="header" :height="layout.headerHeight" :style="{ lineHeight: layout.headerHeight }">
      <naf-header
        :short-name="name"
        :logo-width="asideWidth"
        :menu-collapse="menuCollapse"
        :nav-mode="navMode"
        @toggle-menu="toggleMenu"
        @switch-mode="switchMode"
        :menu-items="navModules | visibility(platform)"
      />
    </el-header>
    <el-main style="padding: 0;display: flex;">
      <el-container class="main">
        <el-aside :width="asideWidth" class="sider" v-show="asideShow">
          <el-scrollbar>
            <naf-sider
              :menu-items="menuItems | visibility(platform)"
              :style="{ width: asideWidth }"
              theme="light"
              :is-collapse="menuCollapse"
              router-prefix="/frame"
            />
          </el-scrollbar>
        </el-aside>
        <el-main class="content">
          <div class="bread" :height="layout.breadHeight" v-show="asideShow">
            <naf-bread></naf-bread>
          </div>
          <div class="page" ref="pageContainer">
            <router-view v-if="!$route.params.module" />
            <iframe
              id="frame"
              ref="iframe"
              :src="routerPath"
              scrolling="no"
              frameborder="0"
              @load="pageLoaded"
              @hashchange="pageLoaded"
              @waiting="loading = true"
              v-else
              v-show="!loading"
            >
            </iframe>
            <div class="weui-loadmore" v-show="loading">
              <i class="weui-loading"></i>
              <span class="weui-loadmore__tips">正在加载</span>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash';
import urljoin from 'url-join';
import Vue from 'vue';
import { createNamespacedHelpers, mapGetters } from 'vuex';
import config from '@frame/config';
import NafHeader from '@naf/frame/header';
import NafSider from '@naf/frame/sider';
import NafBread from '@naf/frame/bread';
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
      loading: false,
    };
  },
  // watch: {
  //   // call again the method if the route changes
  //   routerPath: 'handleLoad',
  // },
  methods: {
    ...mapMutations({
      toggleMenu: types.NAV_TOGGLE_COLLAPSE,
    }),
    ...mapActions(['switchMode']),
    pageLoaded(event) {
      console.log('pageLoaded:', event);
      this.loading = false;
      // const iframe = this.$refs.iframe;
      // const page = this.$refs.pageContainer;
      // iframe.contentWindow.addEventListener('hashchange', this.pageLoaded);
      // setTimeout(_ => {
      //   iframe.height = Math.max(iframe.contentWindow.document.documentElement.scrollHeight, page.scrollHeight);
      //   iframe.width = iframe.contentWindow.document.documentElement.scrollWidth;
      // }, 1000);
    },
  },
  computed: {
    ...mapState({
      navMode: 'mode',
      navModule: 'current',
      navModules: 'modules',
      menuCollapse: 'collapse',
      items: 'items',
    }),
    ...mapGetters(['platform']),
    asideWidth() {
      return this.menuCollapse ? layout.asideCollapseWidth : layout.asideExpandWidth;
    },
    asideShow() {
      return this.navMode !== 'nested' || this.navModule;
    },
    menuItems() {
      let items = this.items || [];
      if (this.navMode == 'nested') {
        items = items.filter(p => p.options.module == this.navModule);
      } else {
        console.log(this.navModules);
        items = items.filter(p => this.navModules.some(m => m.options.module === p.options.module));
      }
      return items;
    },
    routerPath() {
      const { module = '', path = '/' } = this.$route.params;
      return urljoin(process.env.VUE_APP_ROOT_URL, module, `#/${path}`);
    },
  },
  filters: {
    visibility(value, platform) {
      const filterItems = items => {
        if (!_.isArray(items) || items.length === 0) return items;
        return items
          .map(p => {
            return { ...p, children: filterItems(p.children) };
          })
          .filter(p => !p.options.platform || p.options.platform === platform);
      };
      return filterItems(value);
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
      display: flex;
      flex: 1;
      padding: 0;
      overflow: hidden;
      iframe {
        flex: 1;
      }
    }

    // .el-scrollbar {
    //   height: 100%;
    //   width: 100%;
    //   /deep/ .el-scrollbar__wrap {
    //     overflow-x: hidden;
    //     // display: flex;
    //   }
    //   /deep/ .el-scrollbar__view {
    //     padding: 10px;
    //     // display: flex;
    //     // flex: 1;
    //     // flex-direction: column;
    //     // overflow: auto;
    //   }
    // }
  }
}
</style>
