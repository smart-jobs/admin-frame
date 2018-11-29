<template>
  <footer-layout id="app">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <router-view v-else/>
  </footer-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FooterLayout from '@/layouts/footer';

export default {
  name: 'App',
  components: {
    FooterLayout,
  },
  metaInfo: {
    title: '智慧就业',
  },
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapActions(['load']),
  },
  async created() {
    await this.load();
  },
};
</script>
