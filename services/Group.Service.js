import uuid from 'uuid/v4';
import sequelize from '../data-access/connectDB';
import GroupModel from '../models/Group.Model';
import UserModel from '../models/User.Model';

const MODULE_NAME = 'Group.Service';

export default {
    async createGroup(initialData) {
        try {
            const group = { ...initialData, id: uuid() };

            const result = await sequelize.transaction(async (transaction) => {
                return await GroupModel.create(group, { transaction });
            });

            console.log(MODULE_NAME, 'createGroup', 'transaction is completed');
            return result || null;
        } catch (error) {
            console.log(MODULE_NAME, 'createGroup', 'transaction is failed', error);
            return null;
        }
    },

    async updateGroup(groupId, updatedData) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const groupRecord = await GroupModel.findByPk(groupId, { transaction });
                if (!groupRecord) {
                    return null;
                }

                await GroupModel.update(updatedData, {
                    where: {
                        id: groupRecord.id
                    },
                    transaction
                });

                return await GroupModel.findByPk(groupId, { transaction });
            });

            console.log(MODULE_NAME, 'updateGroup', 'transaction is completed');
            return result || null;
        } catch (error) {
            console.log(MODULE_NAME, 'updateGroup', 'transaction is failed', error);
            return null;
        }
    },

    async deleteGroup(groupId) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const groupRecord = await GroupModel.findByPk(groupId, { transaction });
                if (groupRecord) {
                    return await GroupModel.destroy({
                        where: {
                            id: groupRecord.id
                        },
                        transaction
                    });
                }

                return null;
            });

            console.log(MODULE_NAME, 'deleteGroup', 'transaction is completed');
            return result || null;
        } catch (error) {
            console.log(MODULE_NAME, 'deleteGroup', 'transaction is failed', error);
            return null;
        }
    },

    async findGroupById(groupId) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                return await GroupModel.findByPk(groupId, { transaction });
            });

            console.log(MODULE_NAME, 'findGroupById', 'transaction is completed');
            return result || null;
        } catch (error) {
            console.log(MODULE_NAME, 'findGroupById', 'transaction is failed', error);
            return null;
        }
    },

    async getAllGroups() {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                return await GroupModel.findAll({
                    order: ['name'],
                    transaction
                });
            });

            console.log(MODULE_NAME, 'getAllGroups', 'transaction is completed');
            return result;
        } catch (error) {
            console.log(MODULE_NAME, 'getAllGroups', 'transaction is failed', error);
            return [];
        }
    },

    async addUsersToGroup(groupId, userIds) {
        try {
            await sequelize.transaction(async (transaction) => {
                const groupRecord = await GroupModel.findByPk(groupId, { transaction });

                const userRequests = [];
                userIds.forEach(userId => {
                    userRequests.push(UserModel.findByPk(userId, { transaction }));
                });

                const userRecords = await Promise.all(userRequests);

                await groupRecord.addUsers(userRecords, { transaction });
            });

            console.log('transaction is completed');
        } catch (error) {
            console.log('transaction is failed', error);
        }
    }
};
