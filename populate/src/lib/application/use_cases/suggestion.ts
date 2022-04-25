import { ISuggestion, ISuggestionPayload } from "lib/domain/suggestion";
import { ISuggestionRepository } from "lib/domain/suggestion.repository";

export const get_suggestion = async (suggestionRepository:ISuggestionRepository): Promise<ISuggestion[]> => {
  return await suggestionRepository.get();
};

export const create_suggestion = async (suggestionPayload:ISuggestionPayload, suggestionRepository:ISuggestionRepository): Promise<void> => {
  await suggestionRepository.persist(suggestionPayload);
};