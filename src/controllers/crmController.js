import mongoose from 'mongoose'
import { ContactSchema } from '../models/crmModel'

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(err.name === 'ValidationError' ? 400 : 500).json({
            error: err.message,
        });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({})
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getContactWithID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
        res.status(200).json(contact)
    } catch (err) {
        res.status(500).json({error: err.message });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.deleteOne({ _id: req.params.contactId })
        res.json({ message: 'Successfully deleted contact'});
    } catch (err) {
        res.status(500).json({error: err.message });
    }
}