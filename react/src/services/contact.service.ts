import { Contact, ContactPayload, UpdateContactPayload } from 'src/entities/contact';
import { get, post, patch } from 'src/helpers/protected-axios-helper';

const BASE_URL = '/contacts';

const getContactByUserID = async (userId:string): Promise<Contact> => {
  const response = await get<Contact>(`${BASE_URL}/users/${userId}`);
  return response.data;
};

const createContactByUserID = async (userId:string, contact:ContactPayload): Promise<void> => {
  await post(`${BASE_URL}/users/${userId}`, contact);
};

const updateContactByID = async (contactId:string, contact:UpdateContactPayload): Promise<void> => {
  await patch(`${BASE_URL}/${contactId}`, contact);
};

export {
  getContactByUserID,
  createContactByUserID,
  updateContactByID,
};
