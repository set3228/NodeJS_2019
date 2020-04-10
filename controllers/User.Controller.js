import Logger from '../utils/Logger';
import UserService from '../services/User.Service';

const MODULE_NAME = 'User.Controller';

const createUser = async (req, res) => {
    const signupData = req.body;
    try {
        const user = await UserService.signup(signupData);
        res.status(201).json({ user });
    } catch (error) {
        Logger.warn(`${MODULE_NAME} createUser with args: ${JSON.stringify(signupData)} was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

const modifyUser = async (req, res) => {
    const updatedData = req.body;
    const userId = req.params.id;
    try {
        const user = await UserService.updateProfile(userId, updatedData);

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: `User with ${userId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} modifyUser with args: ${userId}, ${JSON.stringify(updatedData)} was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserService.deleteUser(userId);

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: `User with ${userId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} deleteUser with args: ${userId} was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserService.findUserById(userId);

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: `User with ${userId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} getUser with args: ${userId} was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

const getAutoSuggestUsers = async (req, res) => {
    const { loginSubstring, limit } = req.query;
    try {
        const users = await UserService.findUsersByLogin(loginSubstring, limit);

        if (users.length) {
            res.status(200).json({ users });
        } else {
            res.status(404).json({ message: 'Required users do not exist' });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} getAutoSuggestUsers with args: ${loginSubstring}, ${limit} was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

export default {
    createUser,
    getAutoSuggestUsers,
    getUser,
    modifyUser,
    deleteUser
};

