<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <img alt="" class="logo" src="@/assets/logo.svg" />
        <span class="title">{{productName}}</span>
      </div>
      <p class="desc">{{description}}</p>
    </div>
    <div class="main">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="naf-icons naf-icon-user">
            <template slot="append" v-if="unit != 'master'">@
              <!-- <router-view /> -->
              <el-tooltip class="item" effect="dark" :content="unit">
                <code-select category="unit" :value="unit" placeholder="所在单位" :disabled="unit != undefined">
                </code-select>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" prefix-icon="naf-icons naf-icon-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" :style="{width: '100%'}">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="qrcode">
        <img :src="dataUrl">
        <div>微信扫码登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import config from '@frame/config';
import QRCode from 'qrcode';
import { Client } from '@stomp/stompjs/esm5/client';
import CodeSelect from '@naf/data/code-select';

const { productName, description } = config;

const { mapState, mapActions } = createNamespacedHelpers('login');

// import {login, getAdminInfo} from '@/api/getData'
// import {mapActions, mapState} from 'vuex'
export default {
  components: {
    CodeSelect,
  },
  metaInfo: {
    title: '登录',
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      productName,
      description,
      dataUrl: null,
      client: null,
      unit: 'master',
    };
  },
  async mounted() {
    this.unit = this.$route.params.unit;
    await this.initQrcode();
  },
  computed: {
    ...mapState(['qrcode']),
  },
  methods: {
    ...mapActions({
      login: 'login',
      createQrcode: 'qrcode',
    }),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.login({
            username: this.loginForm.username || 'admin',
            password: this.loginForm.password,
          });
          // console.log(res);
          if (this.$checkRes(res, '登录成功', '登录失败')) {
            this.$router.push(this.$route.query.redirect || '/');
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100,
          });
          return false;
        }
        return true;
      });
    },
    async onMessage(message) {
      console.log('receive a message: ', message.body);
      if (message.body == 'scaned') {
        try {
          const res = await this.login({
            qrcode: this.qrcode,
          });
          this.$checkRes(res, '扫码登录成功');
          this.$router.push(this.$route.query.redirect || '/');
        } catch (err) {
          this.$message({
            type: 'error',
            message: err.message || '扫码登录失败',
            duration: 1000,
          });
          console.error(err);
        }
      }
    },
    async initQrcode() {
      // 创建二维码
      await this.createQrcode();
      console.log('this.qrcode: ', this.qrcode);
      let uri = `${Vue.config.weixin.baseUrl}/${this.qrcode}/login`;
      if (uri.startsWith('/')) {
        uri = `${location.protocol}//${location.host}${uri}`;
      }
      this.dataUrl = await QRCode.toDataURL(uri);
      this.$stomp({
        [`/exchange/qrcode.login/${this.qrcode}`]: this.onMessage,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/theme';

.container {
  background: #f0f2f5;
  background-image: url('~@/assets/bg.svg');
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  padding: 110px 0 144px 0;
  position: relative;
}
.main {
  width: 460px;
  margin: 0 auto;
  .el-form {
    width: 280px;
    float: left;
  }
  .qrcode {
    width: 160px;
    font-size: 12px;
    color: darkgray;
    text-align: center;
    background: white;
    float: right;
    padding-bottom: 5px;
    img {
      width: 140px;
      height: 140px;
    }
  }
  .el-select {
    width: 140px;
    /deep/ .el-input__inner {
      padding-left: 16px;
    }
  }
  /deep/ .el-input-group__append {
    padding-left: 5px;
  }
}
.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
  a {
    text-decoration: none;
  }
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: @heading-color;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  font-size: @font-size-base;
  color: @text-color-secondary;
  margin-top: 12px;
  margin-bottom: 40px;
}
</style>
