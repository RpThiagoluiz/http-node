let users = require('../mocks/users');

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

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => Number(user.id) === Number(id));

    if (!user) {
      return response.send(400, { error: 'User not found' });
    }

    response.send(200, user);
  },

  createUser(request, response) {
    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: request.body.name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUserById(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const userExists = users.find((user) => user.id === Number(id));

    if (!userExists) {
      return response.send(400, { error: 'User not found' });
    }

    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          name,
        };
      }

      return user;
    });

    response.send(200, { id, name });
  },
  deleteUserById(request, response) {
    const { id } = request.params;

    const userExists = users.find((user) => user.id === Number(id));

    if (!userExists) {
      return response.send(400, { error: 'User not found' });
    }

    users = users.filter((user) => user.id !== Number(id));

    response.send(200, { msg: `user ${id} has deleted` });
  },
};
