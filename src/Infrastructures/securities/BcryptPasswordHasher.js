const PasswordHasher = require('../../Applications/securities/PasswordHasher');

class BcryptPasswordHasher extends PasswordHasher {
  constructor(bcrypt, saltRound = 10) {
    super();

    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  async hash(password) {
    return this.bcrypt.hash(password, this.saltRound);
  }
}

module.exports = BcryptPasswordHasher;
