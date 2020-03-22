import { DataTypes } from 'sequelize';
import sequelize from '../data-access/connectDB';
import UserModel from './User.Model';
import GroupModel from './Group.Model';

const UserGroup = sequelize.define('userGroups', {
    userId: {
        type: DataTypes.STRING,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.STRING,
        references: {
            model: GroupModel,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

export default UserGroup;
