import Logger from '../utils/Logger';
import AuthService from '../services/Authorization.Service';

const MODULE_NAME = 'Authorization.Controller';

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await AuthService.login(username, password);

        if (!token) {
            res.status(403).json({ success: false, message: 'Bad username/password combination' });
        } else {
            res.status(200).json(token);
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} loginUser was failed with error ${error}`);
        res.status(503).json({ error });
    }
};

const proxyRequests = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        return next();
    }

    const token = req.headers['x-access-token'];
    if (token) {
        // eslint-disable-next-line no-unused-vars
        AuthService.verify(token, (err, decoded) => {
            if (err) {
                Logger.warn(`${MODULE_NAME} proxyRequests attempt to auth with incorrect token ${err}`);
                res.status(403).json({ success: false, message: 'Failed to authenticate token' });
            } else {
                Logger.info(`${MODULE_NAME} proxyRequests: Successful authentication`);
                return next();
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'No token provided' });
    }
};

export default {
    loginUser,
    proxyRequests
};

