const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/pcdl/v1',
    createProxyMiddleware({
      target: 'https://oss-vcd.eng.vmware.com:18889', // aws
      changeOrigin: true,
      secure: false,
      // pathRewrite: {
      //   '/api/pcdl/v1': '/api/pcdl/v1',
      // },
    }),
  );
};
