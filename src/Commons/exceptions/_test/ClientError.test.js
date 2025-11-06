const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('should throw error when it is used directly', () => {
    expect(() => new ClientError('')).toThrow('Cannot instantiate abstract class');
  });
});
