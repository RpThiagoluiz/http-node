const http = require('http');
const { URL } = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log('comp parsedUrl', parsedUrl);

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === parsedUrl.pathname &&
      routeObj.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html',
    });
    response.end(`Cannot ${request.method} in this url ${parsedUrl.pathname}`);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`💕 Server started at http://localhost:${PORT}`);
});
