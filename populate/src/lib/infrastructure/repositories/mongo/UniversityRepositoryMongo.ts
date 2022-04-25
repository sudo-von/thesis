import { IClassroomRepositoryModel, IClassroomRepositoryModelToIClassroom, IClassroomPayloadToIClassroomPayloadRepositoryModel } from "./ClassroomRepositoryMongo";
import { ObjectId, WithId, Document, Db } from "mongodb";
import { IUniversity, IUniversityPayload } from "lib/domain/university";
import { IUniversityRepository } from "lib/domain/university.repository";

export interface IUniversityRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  name:string,
  profile_picture:string,
  classrooms: IClassroomRepositoryModel[],
};

export interface IUniversityPayloadRepositoryModel extends WithId<Document> {
  _id:ObjectId,
  name:string,
  profile_picture:string,
};

export const IUniversityRepositoryModelToIUniversity = (repositoryModel:IUniversityRepositoryModel): IUniversity => {
	return {
		id:repositoryModel._id.toString(),
    name:repositoryModel.name,
		profile_picture:repositoryModel.profile_picture,
		classrooms:repositoryModel.classrooms.map(classroom => IClassroomRepositoryModelToIClassroom(classroom)),
	};
};

export const IUniversityPayloadToIUniversityPayloadRepositoryModel = (model:IUniversityPayload): IUniversityPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
    name:model.name,
		profile_picture:model.profile_picture,
		classrooms:model.classrooms.map(classroom => IClassroomPayloadToIClassroomPayloadRepositoryModel(classroom)),
	};
};

export class UniversityMongoRepository implements IUniversityRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<IUniversity[]> => {
		const universities = (await this.connection.collection('universities').find({}).toArray()) as IUniversityRepositoryModel[];
		return universities.map(university => IUniversityRepositoryModelToIUniversity(university));
	};

	persist = async (universityPayload: IUniversityPayload): Promise<void> => {
		const payload = IUniversityPayloadToIUniversityPayloadRepositoryModel(universityPayload);
		await this.connection.collection('universities').insertOne(payload);
	};

}