import sequelizeLoader from './Sequelize.Loader';
import UserController from '../controllers/User.Controller';

const init = async ({ app }) => {
    await sequelizeLoader();

    const userController =  new UserController(app);
    userController.init();
};

export default {
    init
};
