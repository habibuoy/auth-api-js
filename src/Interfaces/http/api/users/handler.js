const AdduserUseCase = require('../../../../Applications/use_cases/AddUserUseCase');
const ClientError = require('../../../../Commons/exceptions/ClientError');
const DomainErrorMapper = require('../../../../Commons/exceptions/DomainErrorMapper');

class UsersHandler {
  constructor(container) {
    this.container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this.container.getInstance(AdduserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);

    return response;
  }
}

module.exports = UsersHandler;
