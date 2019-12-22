import express from 'express';
import {
    validateBody,
    validateId,
    validateQuery
} from './validators';

import {
    getUser,
    createUser,
    changeUser,
    deleteUser,
    getAutoSuggestUsers
} from './controllers';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/users/', validateBody, createUser);
app.get('/users/', validateQuery, getAutoSuggestUsers);
app.get('/users/:id', validateId, getUser);
app.patch('/users/:id', validateId, validateBody, changeUser);
app.delete('/users/:id', validateId, deleteUser);
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(400).json({ message: error });
});

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});

