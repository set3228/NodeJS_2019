// services
import GroupService from '../services/Group.Service';

const createGroup = async (req, res) => {
    const initialData = req.body;
    const group = await GroupService.createGroup(initialData);

    res.status(201).json({ group });
};

const modifyGroup = async (req, res) => {
    const updatedData = req.body;
    const groupId = req.params.id;
    const group = await GroupService.updateGroup(groupId, updatedData);

    if (group) {
        res.status(200).json({ group });
    } else {
        res.status(404).json({ message: `Group with ${groupId} is not found` });
    }
};

const deleteGroup = async (req, res) => {
    const groupId = req.params.id;
    const group = await GroupService.deleteGroup(groupId);

    if (group) {
        res.status(200).json({ message: `Group with ${groupId} has been deleted` });
    } else {
        res.status(404).json({ message: `Group with ${groupId} is not found` });
    }
};

const getGroup = async (req, res) => {
    const groupId = req.params.id;
    const group = await GroupService.findGroupById(groupId);

    if (group) {
        res.status(200).json({ group });
    } else {
        res.status(404).json({ message: `Group with ${groupId} is not found` });
    }
};

const getAllGroups = async (req, res) => {
    const groups = await GroupService.getAllGroups();

    if (groups.length) {
        res.status(200).json({ groups });
    } else {
        res.status(404).json({ message: 'There are no groups yet' });
    }
};

export default {
    createGroup,
    getAllGroups,
    getGroup,
    modifyGroup,
    deleteGroup
};

