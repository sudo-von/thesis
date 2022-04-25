import { IUniversity } from "./university"

export interface IBasicUser {
	id:string,
	name:string,
	email:string,
};

export interface ITinyUser {
	id:string,
	name:string,
	birth_date:Date,
	email:string,
	registration_number:string,
};

export interface IUser {
	id:string,
	name:string,
	birth_date:Date,
	email:string,
	password:string,
	registration_number:string,
	status:string,
	role:string,
	university:IUniversity,
	creation_date:Date
};

export interface IUserPayload {
	id:string,
	name:string,
	birth_date:Date,
	email:string,
	registration_number:string,
	password:string,
	university_id:string,
	status:string,
	role:string,
	creation_date:Date,
};