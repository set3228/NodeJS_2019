import express from 'express';
import UserValidator from '../validators/User.Validator';
import UserController from '../controllers/User.Controller';

const router = express.Router();

router.post('/', UserValidator.validateBody, UserController.createUser);
router.get('/', UserValidator.validateQuery, UserController.getAutoSuggestUsers);
router.get('/:id', UserValidator.validateId, UserController.getUser);
router.patch('/:id', UserValidator.validateId, UserValidator.validateBody, UserController.modifyUser);
router.delete('/:id', UserValidator.validateId, UserController.deleteUser);

export default router;
