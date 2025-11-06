const bcrypt = require('bcrypt');
const BcryptPasswordHasher = require('../BcryptPasswordHasher');

describe('BcryptPasswordHasher', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHasher = new BcryptPasswordHasher(bcrypt);

      const encryptedPassoword = await bcryptPasswordHasher.hash('password');

      expect(typeof encryptedPassoword).toEqual('string');
      expect(encryptedPassoword).not.toEqual('password');
      // 10 is default salt round value
      expect(spyHash).toHaveBeenCalledWith('password', 10);
    });
  });
});
