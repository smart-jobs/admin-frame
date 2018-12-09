<template>
  <div class="wrapper">
    <div class="titleWrapper">
      <h2 class="title">智慧就业平台</h2>
      <p style="color: gray;">
        一站式就业工作协同平台<br />为高校打造移动化、智能化、精准化的“互联网+就业”平台
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: o-repeat;
  background-size: cover;
  background-image: url('~@/assets/home.png');
}
.titleWrapper {
  text-align: center;
  top: 40%;
  width: 100%;
  position: absolute;
}
.title {
  font-size: 32px;
  color: #333;
  letter-spacing: 1.94px;
  line-height: 2em;
  text-align: center;
}
</style>
