import { SuggestionPayload } from 'src/entities/suggestion';
import { post } from 'src/helpers/protected-axios-helper';

const BASE_URL = '/suggestions';

const sendSuggestion = async (suggestion:SuggestionPayload): Promise<void> => {
  await post(BASE_URL, suggestion);
};

export default sendSuggestion;
