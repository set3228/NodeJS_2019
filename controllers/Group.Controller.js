import Logger from '../utils/Logger';
import GroupService from '../services/Group.Service';

const MODULE_NAME = 'Group.Controller';

const createGroup = async (req, res) => {
    const initialData = req.body;
    try {
        const group = await GroupService.createGroup(initialData);

        res.status(201).json({ group });
    } catch (error) {
        Logger.warn(`${MODULE_NAME} createGroup with args: ${JSON.stringify(initialData)} was failed with error ${error}`);
        res.status(404).json({ error });
    }
};

const modifyGroup = async (req, res) => {
    const updatedData = req.body;
    const groupId = req.params.id;
    try {
        const group = await GroupService.updateGroup(groupId, updatedData);

        if (group) {
            res.status(200).json({ group });
        } else {
            res.status(404).json({ message: `Group with ${groupId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} modifyGroup with args: ${groupId}, ${JSON.stringify(updatedData)} was failed with error ${error}`);
        res.status(404).json({ error });
    }
};

const deleteGroup = async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await GroupService.deleteGroup(groupId);

        if (group) {
            res.status(200).json({ message: `Group with ${groupId} has been deleted` });
        } else {
            res.status(404).json({ message: `Group with ${groupId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} deleteGroup with args: ${groupId} was failed with error ${error}`);
        res.status(404).json({ error });
    }
};

const getGroup = async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await GroupService.findGroupById(groupId);

        if (group) {
            res.status(200).json({ group });
        } else {
            res.status(404).json({ message: `Group with ${groupId} is not found` });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} getGroup with args: ${groupId} was failed with error ${error}`);
        res.status(404).json({ error });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await GroupService.getAllGroups();

        if (groups.length) {
            res.status(200).json({ groups });
        } else {
            res.status(404).json({ message: 'There are no groups yet' });
        }
    } catch (error) {
        Logger.warn(`${MODULE_NAME} getAllGroups was failed with error ${error}`);
        res.status(404).json({ error });
    }
};

export default {
    createGroup,
    getAllGroups,
    getGroup,
    modifyGroup,
    deleteGroup
};

