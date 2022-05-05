import { Advice, AdvicePayload, UpdateAdvicePayload } from 'src/entities/advice';
import {
  get, post, patch, destroy,
} from 'src/helpers/protected-axios-helper';

type AdviceListResponse = {
  total: number,
  results: Advice[]
};

const getAdviceByID = async (adviceId:string): Promise<Advice> => {
  const response = await get<Advice>(`/advices/${adviceId}`);
  return response.data;
};

const getAdvices = async (): Promise<Advice[]> => {
  const response = await get<AdviceListResponse>('/advices');
  return response.data.results;
};

const createAdvice = async (advicePayload:AdvicePayload): Promise<void> => {
  await post('/advices', advicePayload);
};

const deleteAdviceByID = async (adviceId:string) => {
  await destroy(`/advices/${adviceId}`);
};

const updateAdviceByID = async (updateAdvicePayload:UpdateAdvicePayload)
: Promise<void> => {
  await patch(`/advices/${updateAdvicePayload.id}`, updateAdvicePayload);
};

const updateStudentsNumber = async (adviceId:string): Promise<void> => {
  await patch(`/advices/${adviceId}/students-number`, {});
};

export {
  getAdviceByID,
  getAdvices,
  createAdvice,
  deleteAdviceByID,
  updateAdviceByID,
  updateStudentsNumber,
};
