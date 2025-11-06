const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AdduserUseCase {
  constructor({ userRepository, passwordHasher }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(payload) {
    const registerUser = new RegisterUser(payload);

    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHasher.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
}

module.exports = AdduserUseCase;
