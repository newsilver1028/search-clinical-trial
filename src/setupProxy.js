const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    'https://apis.data.go.kr',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      http: true,
    })
  );
};
