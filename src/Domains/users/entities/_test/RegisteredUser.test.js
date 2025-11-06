const RegisteredUser = require('../RegisteredUser');

describe('a RegisteredUser entity', () => {
  it('should throw error when payload does not contain needed properties', () => {
    // Arrange
    const payload = {
      username: 'test',
      fullname: 'Test User',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'test',
      fullname: 'Test User',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create RegisteredUser object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'test',
      fullname: 'Test User',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
