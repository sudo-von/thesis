export interface IBattery {
	id:string,
	battery_level:number,
	low_power_mode:boolean,
	battery_state:string,
	creation_date:Date,
};

export interface IBatteryPayload {
	id:string,
	battery_level:number,
	low_power_mode:boolean,
	battery_state:string,
	creation_date:Date,
};