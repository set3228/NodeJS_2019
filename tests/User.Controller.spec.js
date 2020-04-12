jest.mock('../services/User.Service.js');

import UserController from '../controllers/User.Controller';
import UserService from '../services/User.Service';

const reqStub = {
    body: {}
};

const resStub = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

describe('User.Controller', () => {
    describe('#createUser', () => {
        const userRecord = {};
        const error = new Error();

        beforeEach(() => {
            UserService.signup.mockResolvedValue(userRecord);
        });

        it('should call UserService.signup with body', async () => {
            UserService.signup.mockResolvedValue({});

            await UserController.createUser(reqStub, resStub);

            expect(UserService.signup).toHaveBeenCalledWith(reqStub.body);
        });

        it('should response with status 201 and user record after successful call to the service', async () => {
            UserService.signup.mockResolvedValue(userRecord);

            await UserController.createUser(reqStub, resStub);

            expect(resStub.status).toHaveBeenCalledWith(201);
            expect(resStub.json).toHaveBeenCalledWith(expect.objectContaining({ user: userRecord }));
        });

        it('should response with status 503 and error after failed call to the service', async () => {
            UserService.signup.mockRejectedValue(error);

            await UserController.createUser(reqStub, resStub);

            expect(resStub.status).toHaveBeenCalledWith(503);
            expect(resStub.json).toHaveBeenCalledWith(expect.objectContaining({ error }));
        });
    });
});
