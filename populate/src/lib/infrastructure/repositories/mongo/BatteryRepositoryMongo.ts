import { IBattery, IBatteryPayload } from "lib/domain/battery";
import { IBatteryRepository } from "lib/domain/battery.repository";
import mongo, { ObjectId, WithId, Document } from "mongodb"

export interface IBatteryRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	battery_level:number,
	low_power_mode:boolean,
	battery_state:string,
	creation_date:Date,
};

export interface IBatteryPayloadRepositoryModel extends WithId<Document> {
	_id:ObjectId,
	battery_level:number,
	low_power_mode:boolean,
	battery_state:string,
	creation_date:Date,
};

const IBatteryRepositoryModelToIBattery = (repositoryModel:IBatteryRepositoryModel): IBattery => {
	return {
		id:repositoryModel._id.toString(),
    battery_level:repositoryModel.battery_level,
    low_power_mode:repositoryModel.low_power_mode,
    battery_state:repositoryModel.battery_state,
    creation_date:repositoryModel.creation_date,
	};
};

const IBatteryPayloadToIBatteryPayloadRepositoryModel = (model:IBatteryPayload): IBatteryPayloadRepositoryModel => {
	return {
		_id: new ObjectId(model.id),
    battery_level:model.battery_level,
    low_power_mode:model.low_power_mode,
    battery_state:model.battery_state,
    creation_date:model.creation_date,
	};
};

export class BatteryMongoRepository implements IBatteryRepository {

	connection:mongo.Db;

	constructor(connection:mongo.Db) {
		this.connection = connection;
	}

	get = async (): Promise<IBattery[]> => {
		const batteries = (await this.connection.collection('batteries').find({}).toArray()) as IBatteryRepositoryModel[];
		return batteries.map(battery => IBatteryRepositoryModelToIBattery(battery));
	};

	persist = async (batteryPayload: IBatteryPayload): Promise<void> => {
		const payload = IBatteryPayloadToIBatteryPayloadRepositoryModel(batteryPayload);
		await this.connection.collection('batteries').insertOne(payload);
	};

}