<template>
  <footer-layout id="app">
    <router-view />
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
    title: '登录',
  },
};
</script>
