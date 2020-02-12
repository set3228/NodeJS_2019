import uuid from 'uuid/v4';
import sequelize from './data-access/connectDB';
import UserModel from './models/User.Model';

const initialData = [
    {
        id: '3817fc6a-9886-4c30-8330-998b50401e09',
        isDeleted: false,
        login: 'qweqqrq',
        password: 'qweq1223',
        age: 20
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'dadada',
        password: 'qweq122sfsf3',
        age: 30
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'qwersgdhhfh',
        password: 'fhfhfh465456',
        age: 40
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'qwghjfghjg',
        password: 'dgdfg5646',
        age: 50
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'adsadadh',
        password: '675jjgjj',
        age: 60
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'wehfgfgj',
        password: '68686gjghj',
        age: 70
    },
    {
        id: uuid(),
        isDeleted: false,
        login: 'asdsdsd',
        password: 'fhfh6666',
        age: 80
    }
];

const fillDB = () => {
    UserModel.sync({ force: true })
        .then(() => UserModel.bulkCreate(initialData))
        .then(() => sequelize.close())
        .then(() => console.log('Connection is closed'))
        .catch((err) => console.log('Something went wrong', err));
};

fillDB();
