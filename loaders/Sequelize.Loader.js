import UserModel from '../models/User.Model';

export default async () => {
    try {
        // initialize models
        await UserModel.sync();
        console.log('Models are synchronized with DB');
    } catch (err) {
        console.log('There is an error during connecting to DB', err);
    }
};
