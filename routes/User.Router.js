import express from 'express';
import * as validators from '../middlewares/validators';
import UserController from '../controllers/User.Controller';

const router = express.Router();

router.post('/', validators.validateBody, UserController.createUser);
router.get('/', validators.validateQuery, UserController.getAutoSuggestUsers);
router.get('/:id', validators.validateId, UserController.getUser);
router.patch('/:id', validators.validateId, validators.validateBody, UserController.modifyUser);
router.delete('/:id', validators.validateId, UserController.deleteUser);

export default router;
