import uuid from 'uuid/v4';

const userList = {};

export const getUser = (req, res) => {
    const { id } = req.params;
    const user = userList[id];
    if (user && !user.isDeleted) {
        res.json({ user });
    } else {
        res.status(404).json({ message: `User with ${id} is not found` });
    }
};

export const createUser = (req, res) => {
    const { body } = req;
    const id = uuid();
    console.log(body);
    userList[id] = { ...body, isDeleted: false };
    res.status(201).json({ user: { id, ...userList[id] } });
};

export const changeUser = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const user = userList[id];
    if (user && !user.isDeleted) {
        userList[id] = { ...userList[id], ...body };
        res.status(204).json({});
    } else {
        res.status(404).json({ message: `User with ${id} is not found` });
    }
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const user = userList[id];
    if (user && !user.isDeleted) {
        userList[id].isDeleted = true;
        res.status(204).json({});
    } else {
        res.status(404).json({ message: `User with ${id} is not found` });
    }
};

const sortByLogin = (a, b) => a.login > b.login ? 1 : -1;

export const getAutoSuggestUsers = (req, res) => {
    const { loginSubstring, limit } = req.query;
    const userIds = Object.keys(userList);
    const requiredUsers = userIds.reduce((acc, id) => {
        const user = userList[id];
        if (user.login.indexOf(loginSubstring) !== 1) {
            acc.push(user);
        }

        return acc;
    }, []);

    if (!requiredUsers.length) {
        res.status(404).json({ message: 'Required users do not exist' });
    }

    requiredUsers.sort(sortByLogin);
    res.json({ users: requiredUsers.slice(0, limit) });
};
