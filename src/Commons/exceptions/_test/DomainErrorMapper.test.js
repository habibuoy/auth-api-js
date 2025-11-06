const DomainErrorMapper = require('../DomainErrorMapper');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should map error correctly', () => {
    expect(DomainErrorMapper.map(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Missing needed fields'));
    expect(DomainErrorMapper.map(new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('Fields do not have the correct types'));
    expect(DomainErrorMapper.map(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError("Username's length exceeded limit (50)"));
    expect(DomainErrorMapper.map(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('Username contains restricted character(s)'));
  });

  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some_error_message');

    // Action
    const translatedError = DomainErrorMapper.map(error);

    // Assert
    expect(translatedError).toStrictEqual(error);
  });
});
