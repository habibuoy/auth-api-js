const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entity', () => {
  it('should throw error when payload does not contain needed properties', () => {
    const payload = {
      username: 'test',
      password: 'test',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: true,
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload = {
      username: 'testestestestestestesttestestestestestestesttestestestestestestest',
      fullname: 'Test User',
      password: 'test',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted characters', () => {
    // Arrange
    const payload = {
      username: 'dico ding',
      fullname: 'dicoding',
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create RegisterUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'test',
      fullname: 'Test User',
      password: 'test',
    };

    // Action
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
