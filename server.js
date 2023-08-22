const http = require('node:http');
const { route } = require('./src/router');

const logRequest = (req) =>
  console.log(req.method, req.url, req.httpVersion);

const main = () => {
  const port = 8000;
  const server = http.createServer((req, res) => {
    logRequest(req);
    route(req, res);
  });

  server.listen(port, () => console.log(`Server listening on : ${port}`));
};

main();
