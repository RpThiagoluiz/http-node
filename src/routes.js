const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,
  },

  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.createUser,
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.updateUserById,
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.deleteUserById,
  },
];
