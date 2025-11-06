/* istanbul ignore file */

const { createContainer } = require('instances-container');

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./databases/postgres/pool');

const UserRepositoryPostgres = require('./repositories/UserRepositoryPostgres');
const BcryptPasswordHasher = require('./securities/BcryptPasswordHasher');

const AddUserUseCase = require('../Applications/use_cases/AddUserUseCase');
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHasher = require('../Applications/securities/PasswordHasher');

const container = createContainer();

container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHasher.name,
    Class: BcryptPasswordHasher,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHasher',
          internal: PasswordHasher.name,
        },
      ],
    },
  },
]);

module.exports = container;
