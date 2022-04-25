import { IBasicUser, ITinyUser, IUser, IUserPayload } from "lib/domain/user";
import { IUniversityRepositoryModel, IUniversityRepositoryModelToIUniversity } from "./UniversityRepositoryMongo"
import { ObjectId, WithId, Document, Db } from "mongodb";
import { IUserRepository } from "lib/domain/user.repository";

export interface IBasicUserRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	name:string,
	email:string,
};

export interface ITinyUserRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  name:string,
  birth_date:Date,
  email:string,
  registration_number:string,
  university:IUniversityRepositoryModel,
};

export interface IUserRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  name:string,
  birth_date:Date,
  email:string,
  password:string,
  registration_number:string,
  status:string,
  role:string,
  university:IUniversityRepositoryModel,
  creation_date:Date,
};

export interface IUserPayloadRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  name:string,
  birth_date:Date,
  email:string,
  password:string,
  registration_number:string,
  status:string,
  role:string,
  university_id:ObjectId,
  creation_date:Date,
};

export const IUserRepositoryModelToIUser = (repositoryModel:IUserRepositoryModel): IUser => {
	return {
    id:repositoryModel._id.toString(),
    name:repositoryModel.name,
    birth_date:repositoryModel.birth_date,
    email:repositoryModel.email,
    password:repositoryModel.password,
    registration_number:repositoryModel.registration_number,
    status:repositoryModel.status,
    role:repositoryModel.role,
    university: IUniversityRepositoryModelToIUniversity(repositoryModel.university),
    creation_date:repositoryModel.creation_date,
	};
};

export const IUserPayloadToIUserPayloadRepositoryModel = (model:IUserPayload): IUserPayloadRepositoryModel => {
	return {
    _id: new ObjectId(model.id),
    name:model.name,
    birth_date:model.birth_date,
    email:model.email,
    password:model.password,
    registration_number:model.registration_number,
    status:model.status,
    role:model.role,
    university_id: new ObjectId(model.university_id),
    creation_date:model.creation_date,
	};
};

export const IUserToIBasicUserRepositoryModel = (model:IUser): IBasicUserRepositoryModel => {
	return {
    _id: new ObjectId(model.id),
    name:model.name,
    email:model.email,
	};
};

export const IBasicUserRepositoryModelToIBasicUser = (model:IBasicUserRepositoryModel): IBasicUser => {
	return {
    id:model._id.toString(),
    name:model.name,
    email:model.email,
	};
};

export const ITinyUserRepositoryModelToIBasicUser = (model:ITinyUserRepositoryModel): ITinyUser => {
	return {
    id:model._id.toString(),
    name:model.name,
    birth_date:model.birth_date,
    email:model.email,
    registration_number:model.registration_number,
	};
};

export class UserMongoRepository implements IUserRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<IUser[]> => {
		const users = (await this.connection.collection('users').aggregate([
      {
        "$lookup": {
          "from":         "universities",
          "localField":   "university_id",
          "foreignField": "_id",
          "as":           "university",
        },
      },
      {"$unwind": "$university"},
    ]).toArray()) as IUserRepositoryModel[];
    return users.map(user => IUserRepositoryModelToIUser(user));
	};

	persist = async (userPayload: IUserPayload): Promise<void> => {
		const payload = IUserPayloadToIUserPayloadRepositoryModel(userPayload);
		await this.connection.collection('users').insertOne(payload);
	};

}