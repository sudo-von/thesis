import { ObjectId, WithId, Document } from "mongodb";
import { IAdviceRepository } from "lib/domain/advice.repository";
import { IAdvice, IAdvicePayload } from "lib/domain/advice";
import mongo from 'mongodb';
import { ITinyUserRepositoryModel, ITinyUserRepositoryModelToIBasicUser } from "./UserRepositoryMongo";
import { IClassroomRepositoryModelToIClassroom } from "./ClassroomRepositoryMongo";
import { IUniversityRepositoryModel } from "./UniversityRepositoryMongo";
import { IClassroom } from "lib/domain/classroom";

export interface IAdviceRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  subject:string,
	advice_date:Date,
	classroom_id:ObjectId,
	university:IUniversityRepositoryModel,
	students_will_attend:ObjectId[],
  user:ITinyUserRepositoryModel,
	status:string,
	creation_date:Date,
};

export interface IAdvicePayloadRepositoryModel extends WithId<Document> {
  _id:ObjectId,
	user_id:ObjectId,
	university_id:ObjectId,
	classroom_id:ObjectId,
	subject:string,
	advice_date:Date,
	students_will_attend:string[],
	status:string,
	creation_date:Date,
};

const IAdviceRepositoryModelToIAdvice = (repositoryModel:IAdviceRepositoryModel): IAdvice => {
	const classroom:IClassroom = {
		id: "",
		name: ""
	}
	repositoryModel.university.classrooms.forEach(c => {
		if(c._id.toString() === repositoryModel.classroom_id.toString()){
			classroom.id = c._id.toString();
			classroom.name = c.name;
		}
	});
	return {
		id: repositoryModel._id.toString(),         
		user: ITinyUserRepositoryModelToIBasicUser(repositoryModel.user),
		classroom,
		university_id:repositoryModel.university._id.toString(),
		subject:repositoryModel.subject, 
		advice_date:repositoryModel.advice_date,        
		students_will_attend:repositoryModel.students_will_attend.map((id) => id.toString()),
		status:repositoryModel.status,
		creation_date:repositoryModel.creation_date,
	};
};

const IAdvicePayloadToIAdvicePayloadRepositoryModel = (model:IAdvicePayload): IAdvicePayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id.toString()),
		user_id: new ObjectId(model.user_id.toString()),
		university_id: new ObjectId(model.university_id.toString()),
		classroom_id: new ObjectId(model.id.toString()),
		subject:model.subject, 
		advice_date:model.advice_date,        
		students_will_attend:model.students_will_attend.map((id) => id.toString()),
		status:model.status,
		creation_date:model.creation_date,
	};
};

export class AdviceMongoRepository implements IAdviceRepository {

	connection:mongo.Db;

	constructor(connection:mongo.Db) {
		this.connection = connection;
	}

	get = async (): Promise<IAdvice[]> => {
		let advices = (await this.connection.collection('advices').aggregate([
			{
				"$lookup": {
					"from":         "users",
					"localField":   "user_id",
					"foreignField": "_id",
					"as":           "user",
				},
			},
			{"$unwind": "$user"},
			{
				"$lookup": {
					"from":         "universities",
					"localField":   "university_id",
					"foreignField": "_id",
					"as":           "university",
				},
			},
			{"$unwind": "$university"},
		]).toArray()) as IAdviceRepositoryModel[];
		return advices.map(advice => IAdviceRepositoryModelToIAdvice(advice));
	};

	persist = async (advicePayload: IAdvicePayload): Promise<void> => {
		const payload = IAdvicePayloadToIAdvicePayloadRepositoryModel(advicePayload);
		await this.connection.collection('advices').insertOne(payload);
	};

}
