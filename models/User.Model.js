import { DataTypes } from 'sequelize';
import sequelize from '../data-access/connectDB';

const User = sequelize.define('users', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    isDeleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
    },
    login: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default User;
