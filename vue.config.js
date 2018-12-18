const path = require('path');
const menu = require('./mock/menu');

const frameSrc = path.resolve(__dirname);

const baseUrl = '/admin';

module.exports = {
  // baseUrl: './',
  baseUrl: baseUrl, // : process.env.VUE_APP_ROOT_URL,

  configureWebpack: {
    externals: {
      'element-ui': 'Element',
      weui: 'weui',
      vue: 'Vue',
    },
    resolve: {
      alias: {
        '@frame': frameSrc,
        '@naf': path.join(frameSrc, '/naf'),
        '@lib': path.join(frameSrc, '/lib'),
      },
    },
  },

  devServer: {
    port: 3000,
    // historyApiFallback: {
    //   disableDotRule: true,
    //   rewrites: [
    //     { from: /^\/$/, to: path.posix.join(baseUrl, 'loading.html') },
    //     { from: /\/login/, to: path.posix.join(baseUrl, 'login.html') },
    //     { from: /\/frame/, to: path.posix.join(baseUrl, 'frame.html') },
    //     { from: /./, to: path.posix.join(baseUrl, '404.html') },
    //   ],
    // },
    before(app) {
      app.use((req, res, next) => {
        console.log(`[${req.method}]`, req.path);
        next();
      });
      app.use('/platform/api', menu);
    },
    proxy: {
      // '/platform/api/docflow': {
      //   target: 'http://localhost:8301',
      //   pathRewrite: { '^/platform/api/docflow': '' },
      // },
      '/platform/api': {
        // target: 'http://smart.chinahuian.cn',
        target: 'http://smart.localhost:8000',
      },
      '/ws': {
        // target: 'http://smart.chinahuian.cn',
        target: 'http://smart.localhost:8000',
        ws: true,
      },
      '/files': {
        target: 'http://smart.chinahuian.cn',
      },
      '/admin/system': {
        target: 'http://localhost:3001',
      },
      '/admin/jobs': {
        target: 'http://localhost:3002',
      },
      '/admin/docflow': {
        target: 'http://localhost:3003',
      },
    },
  },
};
