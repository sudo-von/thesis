import { IClassroom, IClassroomPayload } from "lib/domain/classroom";
import { Db, ObjectId, WithId, Document } from "mongodb";

export interface IClassroomRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	name:string,
};

export interface IClassroomPayloadRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	name:string,
};

export const IClassroomRepositoryModelToIClassroom = (repositoryModel:IClassroomRepositoryModel): IClassroom => {
	return {
		id:repositoryModel._id.toString(),
    name:repositoryModel.name,
	};
};

export const IClassroomPayloadToIClassroomPayloadRepositoryModel = (model:IClassroomPayload): IClassroomPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
    name:model.name,
	};
};