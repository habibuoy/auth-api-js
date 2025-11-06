const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHasher = require('../../securities/PasswordHasher');
const AddUserUserCase = require('../AddUserUseCase');

describe('AddUserUserCase', () => {
  it('should orchestrates add user action correctly', async () => {
    const payload = {
      username: 'test',
      password: 'test',
      fullname: 'Test User',
    };

    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: payload.username,
      fullname: payload.fullname,
    });

    const mockUserRepository = new UserRepository();
    const mockPasswordHasher = new PasswordHasher();

    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockPasswordHasher.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));

    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    const getUserCase = new AddUserUserCase({
      userRepository: mockUserRepository,
      passwordHasher: mockPasswordHasher,
    });

    const registeredUser = await getUserCase.execute(payload);

    expect(registeredUser).toStrictEqual(new RegisteredUser({
      id: 'user-123',
      username: payload.username,
      fullname: payload.fullname,
    }));
    expect(mockUserRepository.verifyAvailableUsername).toHaveBeenCalledWith(payload.username);
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith(payload.password);
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(new RegisterUser({
      username: payload.username,
      password: 'encrypted_password',
      fullname: payload.fullname,
    }));
  });
});
