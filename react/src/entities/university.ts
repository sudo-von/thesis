import { Classroom } from './classroom';

export type University = {
  id: string,
  name: string,
  profilePicture: string,
  classrooms: Classroom[]
};
