import { DataTypes } from 'sequelize';
import sequelize from '../data-access/connectDB';
import UserModel from './User.Model';
import GroupModel from './Group.Model';

const UserGroup = sequelize.define('userGroups', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.STRING,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    GroupId: {
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
