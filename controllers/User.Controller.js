// middlewares
import express from 'express';
import * as validators from '../middlewares/validators';

// services
import UserService from '../services/User.Service';

const createUser = async (req, res) => {
    const signupData = req.body;
    const user = await UserService.Signup(signupData);

    res.status(201).json({ user });
};

const modifyUser = async (req, res) => {
    const updatedData = req.body;
    const userId = req.params.id;
    const user = await UserService.UpdateProfile(userId, updatedData);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.DeleteUser(userId);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.FindUserById(userId);

    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User with ${userId} is not found` });
    }
};

const getAutoSuggestUsers = async (req, res) => {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.FindUsersByLogin(loginSubstring, limit);

    if (users.length) {
        res.status(200).json({ users });
    } else {
        res.status(404).json({ message: 'Required users do not exist' });
    }
};


export default class UserController {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.app.use(express.json());
        this.app.post('/users/', validators.validateBody, createUser);
        this.app.get('/users/', validators.validateQuery, getAutoSuggestUsers);
        this.app.get('/users/:id', validators.validateId, getUser);
        this.app.patch('/users/:id', validators.validateId, validators.validateBody, modifyUser);
        this.app.delete('/users/:id', validators.validateId, deleteUser);

        // eslint-disable-next-line no-unused-vars
        this.app.use((error, req, res, next) => {
            res.status(400).json({ message: error });
        });
    }
}
