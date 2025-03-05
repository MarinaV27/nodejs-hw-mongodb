import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,

}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find()
        .merge(contactsQuery)
        .countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    
    const paginationData = calculatePaginationData({contactsCount,
        perPage, page});

    return {
        contacts,
        page,
        perPage,
        ...paginationData,
    };
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