<template>
  <div>
    <h3>routerPath: {{ routerPath }}</h3>
    <h3>params: {{ $route.params }}</h3>
  </div>
</template>

<script>
import urljoin from 'url-join';

export default {
  name: 'Frame',
  computed: {
    routerPath() {
      const { module = '', path = '/' } = this.$route.params;
      const { base } = this.$router.options;
      return urljoin(base, module, path);
    },
  },
};
</script>
