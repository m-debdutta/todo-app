const fs = require('fs');

const MIME_TYPES = {
  html: 'text/html',
  css: 'text/css',
  json: 'application/json',
  js: 'text/javascript',
};

const HEADERS = {
  html: { 'content-type': MIME_TYPES.html },
  css: { 'content-type': MIME_TYPES.css },
  js: { 'content-type': MIME_TYPES.js },
  json: { 'content-type': MIME_TYPES.json },
};

const respondInvalidMethod = (request, response) => {
  response.statusCode = 405;
  response.end('INVALID_METHOD');
};

const getExtension = (filePath) => filePath.split('.').pop();

const resolveFilePath = (url) =>
  url === '/' ? 'resources/pages/index.html' : `resources${url}`;

const createResponseHeaders = (filePath) => {
  const extension = getExtension(filePath);
  return HEADERS[extension];
};

const serveContent = (req, res) => {
  const filePath = resolveFilePath(req.url);
  const responseHeaders = createResponseHeaders(filePath);

  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      respondPageNotFound(req, res);
      return;
    }

    res.setHeader('content-length', fileData.length);
    res.writeHead(200, responseHeaders);
    res.end(fileData);
  });
};

const isGetRequest = (method) => method === 'GET';

const route = (req, res) => {
  if (isGetRequest(req.method)) {
    return serveContent(req, res);
  }

  respondInvalidMethod(req, res);
};

module.exports = { route };
