import { IUniversityRepositoryModel } from "./UniversityRepositoryMongo"
import { IBasicUserRepositoryModel, IBasicUserRepositoryModelToIBasicUser } from "./UserRepositoryMongo"
import { ObjectId, WithId, Document, Db } from "mongodb";
import { IDepartment, IDepartmentPayload } from "lib/domain/department";
import { IDepartmentRepository } from "lib/domain/department.repository";

export interface IDepartmentRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user:IBasicUserRepositoryModel,
	university:IUniversityRepositoryModel,
	description:string,
	street:string,
	neighborhood:string,
	cost:number,
	status:string,
	available:boolean,
	creation_date:Date,
};

export interface IDepartmentPayloadRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	university_id:ObjectId,
	description:string,
	street:string,
	neighborhood:string,
	cost:number,
	available:boolean,
	status:string,
	creation_date:Date,
};

const IDepartmentRepositoryModelToIDepartment = (repositoryModel:IDepartmentRepositoryModel): IDepartment => {
	return {
		id:repositoryModel._id.toString(),
		user:IBasicUserRepositoryModelToIBasicUser(repositoryModel.user),
		university_id:repositoryModel._id.toString(),
    description:repositoryModel.description,
		street:repositoryModel.street,
    neighborhood:repositoryModel.neighborhood,
		cost:repositoryModel.cost,
    available:repositoryModel.available,
    status:repositoryModel.status,
    creation_date:repositoryModel.creation_date,
	};
};

const IDepartmentPayloadToIDepartmentPayloadRepositoryModel = (model:IDepartmentPayload): IDepartmentPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
		user_id: new ObjectId(model.user_id),
		university_id: new ObjectId(model.university_id),
    description:model.description,
		street:model.street,
    neighborhood:model.neighborhood,
		cost:model.cost,
    available:model.available,
    status:model.status,
    creation_date:model.creation_date,
	};
};

export class DepartmentMongoRepository implements IDepartmentRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<IDepartment[]> => {
		const departments = (await this.connection.collection('departments').aggregate([
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
		]).toArray()) as IDepartmentRepositoryModel[];
		return departments.map(department => IDepartmentRepositoryModelToIDepartment(department));
	};

	persist = async (departmentPayload: IDepartmentPayload): Promise<void> => {
		const payload = IDepartmentPayloadToIDepartmentPayloadRepositoryModel(departmentPayload);
		await this.connection.collection('departments').insertOne(payload);
	};

}