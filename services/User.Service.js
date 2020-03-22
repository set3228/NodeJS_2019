import uuid from 'uuid/v4';
import { Op } from 'sequelize';
import sequelize from '../data-access/connectDB';
import UserModel from '../models/User.Model';

const MODULE_NAME = 'User.Service';

export default {
    async signup(registrationData) {
        try {
            const user = {
                ...registrationData,
                id: uuid(),
                isDeleted: false
            };

            const result = await sequelize.transaction(async (transaction) => {
                return await UserModel.create(user, { transaction });
            });

            console.log(MODULE_NAME, 'signup', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'signup', 'transaction is failed', error);
            throw error;
        }
    },

    async updateProfile(userId, updatedData) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const userRecord = await UserModel.findByPk(userId, { transaction });
                if (!userRecord || userRecord.isDeleted) {
                    return null;
                }

                await UserModel.update(updatedData, {
                    where: {
                        id: userRecord.id
                    },
                    transaction
                });

                return await UserModel.findByPk(userId, { transaction });
            });

            console.log(MODULE_NAME, 'updateProfile', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'updateProfile', 'transaction is failed', error);
            throw error;
        }
    },

    async deleteUser(userId) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const userRecord = await UserModel.findByPk(userId, { transaction });
                if (!userRecord || userRecord.isDeleted) {
                    return null;
                }

                await UserModel.update({
                    isDeleted: true
                }, {
                    where: {
                        id: userRecord.id
                    },
                    transaction
                });

                return await UserModel.findByPk(userId, { transaction });
            });

            console.log(MODULE_NAME, 'deleteUser', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'deleteUser', 'transaction is failed', error);
            throw error;
        }
    },

    async findUserById(userId) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const userRecord = await UserModel.findByPk(userId, { transaction });
                if (!userRecord || userRecord.isDeleted) {
                    return null;
                }

                return userRecord;
            });

            console.log(MODULE_NAME, 'findUserById', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'findUserById', 'transaction is failed', error);
            throw error;
        }
    },

    async findUsersByLogin(str, limit) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const userRecords = await UserModel.findAll({
                    where: {
                        login: {
                            [Op.like]: `${str}%`
                        }
                    },
                    order: ['login'],
                    limit,
                    transaction
                });

                return userRecords || [];
            });

            console.log(MODULE_NAME, 'findUsersByLogin', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'findUsersByLogin', 'transaction is failed', error);
            throw error;
        }
    }
};
