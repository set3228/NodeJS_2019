import uuid from 'uuid/v4';
import { Op } from 'sequelize';
import UserModel from '../models/User.Model';

export default {
    async Signup(registrationData) {
        const user = {
            ...registrationData,
            id: uuid(),
            isDeleted: false
        };

        const userRecord = await UserModel.create(user);
        return userRecord;
    },

    async UpdateProfile(userId, updatedData) {
        let result = null;
        const userRecord = await UserModel.findByPk(userId);
        if (userRecord && !userRecord.isDeleted) {
            await UserModel.update(updatedData, {
                where: {
                    id: userRecord.id
                }
            });

            result = await UserModel.findByPk(userId);
        }

        return result;
    },

    async DeleteUser(userId) {
        let result = null;
        const userRecord = await UserModel.findByPk(userId);
        if (userRecord && !userRecord.isDeleted) {
            await UserModel.update({
                isDeleted: true
            }, {
                where: {
                    id: userRecord.id
                }
            });

            result = await UserModel.findByPk(userId);
        }

        return result;
    },

    async FindUserById(userId) {
        let result = null;
        const userRecord = await UserModel.findByPk(userId);
        if (userRecord && !userRecord.isDeleted) {
            result = userRecord;
        }
        console.log(userRecord);

        return result;
    },

    async FindUsersByLogin(str, limit) {
        const userRecords = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `${str}%`
                }
            },
            order: ['login'],
            limit
        });

        return userRecords || [];
    }
};
