import { University } from 'src/entities/university';
import { get } from 'src/helpers/protected-axios-helper';
import { get as publicGet } from 'src/helpers/public-axios-helper';

const BASE_URL = '/universities';

type UniversityListResponse = {
  total: number,
  results: University[]
};

const getUniversityByID = async (universityId:string): Promise<University> => {
  const response = await get<University>(`${BASE_URL}/${universityId}`);
  return response.data;
};

const getUniversities = async (): Promise<University[]> => {
  const response = await publicGet<UniversityListResponse>(BASE_URL);
  return response.data.results;
};

export {
  getUniversityByID,
  getUniversities,
};
