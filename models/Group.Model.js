import { DataTypes } from 'sequelize';
import sequelize from '../data-access/connectDB';

const Group = sequelize.define('groups', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    permissions: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    }
}, {
    freezeTableName: true
});

export default Group;
