export type Contact = {
  id: string,
  userId: string,
  contactName: string,
  contactNumber: string,
  message: string,
};

export type ContactPayload = {
  contactName: string,
  contactNumber: string,
  message: string,
};

export type UpdateContactPayload = {
  contactName: string,
  contactNumber: string,
  message: string,
};
