<template>
  <footer-layout id="app">
    <!-- <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div> -->
    <router-view/>
  </footer-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FooterLayout from '@/layouts/footer';

export default {
  name: 'App',
  components: {
    FooterLayout,
  },
  metaInfo: {
    title: '智慧就业',
  },
  async mounted() {
    console.log('call load');
    await this.load();
  },
  methods: {
    ...mapActions(['load']),
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>
