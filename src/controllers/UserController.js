const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const sortedUsers = users.sort((a, b) => {
      const { order } = request.query;

      if (order === 'desc') {
        // http://localhost:3000/users?order=desc
        return a.id < b.id ? 1 : -1;
      }
      // http://localhost:3000/users?order=asc
      return a.id > b.id ? 1 : -1;
    });

    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(sortedUsers));
  },
};
