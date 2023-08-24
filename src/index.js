const http = require('http');

const users = require('./mocks/users');

const server = http.createServer((request, response) => {
  if (request.url === '/users' && request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(users));
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html',
    });
    response.end(`Cannot ${request.method} in this url ${request.url}`);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`💕 Server started at http://localhost:${PORT}`);
});
