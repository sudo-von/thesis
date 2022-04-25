import { IContact, IContactPayload } from "lib/domain/contact";
import { IContactRepository } from "lib/domain/contact.repository";
import { Db, ObjectId, WithId, Document } from "mongodb";

export interface IContactRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	contact_name:string,
	contact_number:string,
	message:string,
	creation_date:Date,
}
export interface IContactPayloadRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	user_id:ObjectId,
	contact_name:string,
	contact_number:string,
	message:string,
	creation_date:Date,
};

const IContactRepositoryModelToIContact = (repositoryModel:IContactRepositoryModel): IContact => {
	return {
		id:repositoryModel._id.toString(),
		user_id:repositoryModel.user_id.toString(),
    contact_name:repositoryModel.contact_name,
		contact_number:repositoryModel.contact_number,
    message:repositoryModel.message,
    creation_date:repositoryModel.creation_date,
	};
};

const IContactPayloadToIContactPayloadRepositoryModel = (model:IContactPayload): IContactPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
		user_id: new ObjectId(model.user_id),
    contact_name:model.contact_name,
		contact_number:model.contact_number,
    message:model.message,
    creation_date:model.creation_date,
	};
};

export class ContactMongoRepository implements IContactRepository {

	connection:Db;

	constructor(connection:Db) {
		this.connection = connection;
	}

	get = async (): Promise<IContact[]> => {
		const contacts = (await this.connection.collection('contacts').find({}).toArray()) as IContactRepositoryModel[];
		return contacts.map(contact => IContactRepositoryModelToIContact(contact));
	};

	persist = async (contactPayload: IContactPayload): Promise<void> => {
		const payload = IContactPayloadToIContactPayloadRepositoryModel(contactPayload);
		await this.connection.collection('contacts').insertOne(payload);
	};

}