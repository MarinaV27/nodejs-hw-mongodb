import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    userId,

}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId});

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find()
        .merge(contactsQuery)
        .countDocuments(),
        contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
        
    ]);
    const paginationData = calculatePaginationData({count:contactsCount, perPage, page, 
        });

    return {
    data: contacts,
    ...paginationData,
  };
    };


export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
    }
    
if (Object.keys(payload).length === 0) {
      throw createHttpError(400, 'No fields to update' );
    }

  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: payload },
    { new: true, includeResultMetadata: true },
  );

  return updatedContact?.value ?? null;
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId, userId
    });
    return contact;
};