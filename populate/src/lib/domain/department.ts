import { IBasicUser } from "./user";

export interface IDepartment {
	id:string,
	user:IBasicUser,
	university_id:string,
	description:string,
	street:string,
	neighborhood:string,
	status:string,
	cost:number,
	available:boolean,
	creation_date:Date,
};

export interface IDepartmentPayload {
	id:string,
	user_id:string,
	university_id:string,
	description:string,
	street:string,
	neighborhood:string,
	cost:number,
	status:string,
	available:boolean,
	creation_date:Date,
};