const http = require("http");
const DEFAULT_USER = { username: "davi", password: "1234" };

const routes = {
  "/contact:get": (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("contact us page");
    return response.end();
  },

  "/login:post": (request, response) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
    });
    request.on('end', () => {
      const user = JSON.parse(body);
      if(
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password) {

          response.writeHead(401, { 'Content-Type': 'text/html' });
          response.write("Login failed!");
          return response.end();
        }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write("Logging has succeeded!");
      return response.end();
    });
  },

  default: (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("Hello World!");
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;

  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3333, () => console.log("Server running at http://localhost:3333/"));

module.exports = app;
