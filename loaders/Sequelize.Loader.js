import UserModel from '../models/User.Model';
import GroupModel from '../models/Group.Model';
import UserGroupModel from '../models/UserGroup.Model';

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });

export default async () => {
    try {
        // initialize models
        await UserModel.sync();
        await GroupModel.sync();
        await UserGroupModel.sync();
        console.log('Models are synchronized with DB');
    } catch (err) {
        console.log('There is an error during connecting to DB', err);
    }
};
