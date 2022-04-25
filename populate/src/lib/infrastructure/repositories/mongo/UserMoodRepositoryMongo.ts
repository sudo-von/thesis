import { IUserMood, IUserMoodPayload } from "lib/domain/userMood";
import { IUserMoodRepository } from "lib/domain/userMood.repository";
import { ObjectId, WithId, Document, Db } from "mongodb";

export interface IUserMoodRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	mood:number,
	creation_date:Date,
};

export interface IUserMoodPayloadModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	mood:number,
	creation_date:Date,
};

const IUserMoodRepositoryModelToIUserMood = (repositoryModel:IUserMoodRepositoryModel): IUserMood => {
	return {
		id:repositoryModel._id.toString(),
    user_id:repositoryModel.user_id.toString(),
		mood:repositoryModel.mood,
		creation_date:repositoryModel.creation_date,
	};
};

const IUserMoodPayloadToIUserMoodPayloadModel = (model:IUserMoodPayload): IUserMoodPayloadModel => {
	return {
		_id: new ObjectId(model.id),
    user_id: new ObjectId(model.user_id),
		mood:model.mood,
		creation_date:model.creation_date,
	};
};

export class UserMoodMongoRepository implements IUserMoodRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<IUserMood[]> => {
		const userMoods = (await this.connection.collection('users_mood').find({}).toArray()) as IUserMoodRepositoryModel[];
		return userMoods.map(userMood => IUserMoodRepositoryModelToIUserMood(userMood));
	};

	persist = async (userMoodPayload: IUserMoodPayload): Promise<void> => {
		const payload = IUserMoodPayloadToIUserMoodPayloadModel(userMoodPayload);
		await this.connection.collection('users_mood').insertOne(payload);
	};

}