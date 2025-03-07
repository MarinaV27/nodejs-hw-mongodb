import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  if (!rawResult) return null;

  return rawResult;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete({
        _id: contactId,
    });
    return contact;
};