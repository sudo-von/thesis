import { ISuggestion, ISuggestionPayload } from "lib/domain/suggestion";
import { ISuggestionRepository } from "lib/domain/suggestion.repository";
import { ObjectId, WithId, Document, Db } from "mongodb";

export interface ISuggestionRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	suggestion:string,
	creation_date:Date,
};

export interface ISuggestionPayloadRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	suggestion:string,
	creation_date:Date,
};

const ISuggestionRepositoryModelToISuggestion = (repositoryModel:ISuggestionRepositoryModel): ISuggestion => {
	return {
		id:repositoryModel._id.toString(),
    user_id:repositoryModel.user_id.toString(),
		suggestion:repositoryModel.suggestion,
		creation_date:repositoryModel.creation_date,
	};
};

const ISuggestionPayloadToISuggestionPayloadRepositoryModel = (model:ISuggestionPayload): ISuggestionPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
		user_id: new ObjectId(model.user_id),
		suggestion:model.suggestion,
		creation_date:model.creation_date,
	};
};

export class SuggestionMongoRepository implements ISuggestionRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<ISuggestion[]> => {
		const suggestions = (await this.connection.collection('suggestions').find({}).toArray()) as ISuggestionRepositoryModel[];
		return suggestions.map(suggestion => ISuggestionRepositoryModelToISuggestion(suggestion));
	};

	persist = async (suggestionPayload: ISuggestionPayload): Promise<void> => {
		const payload = ISuggestionPayloadToISuggestionPayloadRepositoryModel(suggestionPayload);
		await this.connection.collection('suggestions').insertOne(payload);
	};

}