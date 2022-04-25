import { IContact, IContactPayload } from "lib/domain/contact";
import { IContactRepository } from "lib/domain/contact.repository";

export const get_contact = async (contactRepository:IContactRepository): Promise<IContact[]> => {
  return await contactRepository.get();
};

export const create_contact = async (contactPayload:IContactPayload, contactRepository:IContactRepository): Promise<void> => {
  await contactRepository.persist(contactPayload);
};