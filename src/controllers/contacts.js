import createHttpError from "http-errors";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortBy, sortOrder } = parseSortParams(req.query);
    
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });
    
        res.status(200).json({
        status: 200,
        message: "Successfully created a contact!",
        data: contacts,
    });
    
};


    export const getContactsByIdController = async (req, res) => {
        const { contactId } = req.params;
      const contact = await getContactById({ _id: contactId, userId:req.user._id });

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        };

        // Відповідь, якщо контакт знайдено
        res.status(200).send({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });

};
    
export const createContactController = async (req, res) => {
    if (!req.user || !req.user._id) {
    throw createHttpError(401);
  }
  
  const photo = req.file;
    let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
   
   
    const contact = await createContact({
        ...req.body,
        userId: req.user._id,
        photo: photoUrl,
    });

    res.status(201).send({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(
    {
    _id: contactId,
    userId: req.user._id,
  },
    { ...req.body, photo: photoUrl },
    userId,
  );

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} was not found`);
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

   const { _id: userId } = req.user;
  const contact = await deleteContact(contactId, userId);
  if (!contact)
    throw createHttpError(404, `Contact with id ${contactId} was not found`);

  res.status(204).send();
};