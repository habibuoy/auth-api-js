const InvariantError = require('./InvariantError');

const DomainErrorMapper = {
  map(error) {
    return DomainErrorMapper._responses[error.message] || error;
  },
};

DomainErrorMapper._responses = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Missing needed fields'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Fields do not have the correct types'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError("Username's length exceeded limit (50)"),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('Username contains restricted character(s)'),
};

module.exports = DomainErrorMapper;
