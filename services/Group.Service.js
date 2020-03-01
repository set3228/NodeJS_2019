import uuid from 'uuid/v4';
import sequelize from '../data-access/connectDB';
import GroupModel from '../models/Group.Model';
import UserModel from '../models/User.Model';

export default {
    async createGroup(initialData) {
        const group = {
            ...initialData,
            id: uuid()
        };

        const groupRecord = await GroupModel.create(group);
        return groupRecord;
    },

    async updateGroup(groupId, updatedData) {
        let result = null;
        const groupRecord = await GroupModel.findByPk(groupId);
        if (groupRecord) {
            await GroupModel.update(updatedData, {
                where: {
                    id: groupRecord.id
                }
            });

            result = await GroupModel.findByPk(groupId);
        }

        return result;
    },

    async deleteGroup(groupId) {
        let result = null;
        const groupRecord = await GroupModel.findByPk(groupId);
        if (groupRecord) {
            result = await GroupModel.destroy({
                where: {
                    id: groupRecord.id
                }
            });
        }

        return result;
    },

    async findGroupById(groupId) {
        let result = null;
        const groupRecord = await GroupModel.findByPk(groupId);
        if (groupRecord) {
            result = groupRecord;
        }

        return result;
    },

    async getAllGroups() {
        const groupRecords = await GroupModel.findAll({
            order: ['name']
        });

        return groupRecords || [];
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
