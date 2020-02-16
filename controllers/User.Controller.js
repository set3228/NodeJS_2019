// services
import UserService from '../services/User.Service';

const createUser = async (req, res) => {
    const signupData = req.body;
    const user = await UserService.signup(signupData);

    res.status(201).json({ user });
};

const modifyUser = async (req, res) => {
    const updatedData = req.body;
    const userId = req.params.id;
    const user = await UserService.updateProfile(userId, updatedData);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.deleteUser(userId);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.findUserById(userId);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const getAutoSuggestUsers = async (req, res) => {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.findUsersByLogin(loginSubstring, limit);

    if (users.length) {
        res.status(200).json({ users });
    } else {
        res.status(404).json({ message: 'Required users do not exist' });
    }
};

export default {
    createUser,
    getAutoSuggestUsers,
    getUser,
    modifyUser,
    deleteUser
};

