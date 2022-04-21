import { Mood, MoodPayload } from 'src/entities/mood';
import { get, post } from 'src/helpers/protected-axios-helper';

const BASE_URL = '/users-mood';

const getMood = async (userId:string): Promise<Mood> => {
  const response = await get<Mood>(`${BASE_URL}/users/${userId}`);
  return response.data;
};

const createMood = async (userId:string, moodPayload:MoodPayload) => {
  await post(`${BASE_URL}/users/${userId}`, moodPayload);
};

export {
  getMood,
  createMood,
};
