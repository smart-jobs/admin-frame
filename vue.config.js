const path = require('path');
const menu = require('./mock/menu');

const frameSrc = path.resolve(__dirname);

const baseUrl = '/admin';

module.exports = {
  // baseUrl: './',
  baseUrl: baseUrl,

  pages: {
    login: 'src/pages/login/main.js',
    frame: 'src/pages/frame/main.js',
  },

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
    port: 3100,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/$/, to: path.posix.join(baseUrl, 'loading.html') },
        { from: /\/login/, to: path.posix.join(baseUrl, 'login.html') },
        { from: /\/frame/, to: path.posix.join(baseUrl, 'frame.html') },
        { from: /./, to: path.posix.join(baseUrl, '404.html') },
      ],
    },
    before(app) {
      app.use((req, res, next) => {
        console.log(`[${req.method}]`, req.path);
        next();
      });
      app.use('/api', menu);
    },
    proxy: {
      '/platform/api': {
        // target: 'http://localhost:9000',
        target: 'http://99991.smart.chinahuian.cn',
      },
      '/ws': {
        target: 'http://99991.smart.chinahuian.cn',
        ws: true,
      },
    },
  },
};
