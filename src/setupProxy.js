const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({ target: 'https://mazu-nft.s3.amazonaws.com/' })
  );
};
