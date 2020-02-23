import express from 'express';
import GroupValidator from '../validators/Group.Validator';
import GroupController from '../controllers/Group.Controller';

const router = express.Router();

router.post('/', GroupValidator.validateBody, GroupController.createGroup);
router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupValidator.validateId, GroupController.getGroup);
router.patch('/:id', GroupValidator.validateId, GroupValidator.validateBody, GroupController.modifyGroup);
router.delete('/:id', GroupValidator.validateId, GroupController.deleteGroup);

export default router;
