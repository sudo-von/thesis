import { Classroom } from './classroom';
import { TinyUser } from './user';

type Advice = {
  id: string,
  subject: string,
  adviceDate: string,
  studentsWillAttend: string[],
  classroom: Classroom
  user: TinyUser,
};

type AdvicePayload = {
  subject: string,
  adviceDate: string,
  classroomId: string,
};

type UpdateAdvicePayload = {
  id: string,
  subject: string,
  adviceDate: string,
  classroomId: string,
};

export type {
  Advice,
  AdvicePayload,
  UpdateAdvicePayload,
};
