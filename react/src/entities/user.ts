type BasicUser = {
  id: string,
  name: string,
  email: string,
};

type UserPayload = {
  name: string,
  birthDate: string,
  email: string,
  registrationNumber: string,
  universityId: string,
  password: string,
};

type TinyUser = {
  id: string,
  name: string,
  birthDate: string,
  email: string,
  registrationNumber: string,
};

type TinyUserPayload = {
  name?: string,
  birthDate?: string,
  email?: string,
  registrationNumber?: string,
};

export type {
  BasicUser,
  UserPayload,
  TinyUser,
  TinyUserPayload,
};
