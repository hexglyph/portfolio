//Admin Service

import { Admin } from '../models/admin';

const getAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createAdmin = async (req, res) => {
    const admin = req.body;
    const newAdmin = new Admin(admin);
    try {
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const admin = await Admin.findByIdAndUpdate(id, { name, email, password }, { new: true });
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await Admin.findByIdAndRemove(id);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    getAdmin,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
}