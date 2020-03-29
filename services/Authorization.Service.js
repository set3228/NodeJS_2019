import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import UserService from './User.Service';
import validator from '../validators/Authorization.Validator';

const MODULE_NAME = 'Authorization.Service';

export default {
    async login(username, password) {
        try {
            if (validator.validateLogin({ username, password })) {
                console.log(MODULE_NAME, 'login:', 'validation error');
                return null;
            }

            const userRecord = await UserService.findUserByLogin(username);

            if (!userRecord || userRecord.password !== password) {
                return null;
            }

            const payload = { sub: userRecord.id };
            console.log(MODULE_NAME, 'login:', 'success');
            return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 120 });
        } catch (error) {
            throw error;
        }
    },

    verify(token, callback) {
        jwt.verify(token, JWT_SECRET_KEY, callback);
    }
};
