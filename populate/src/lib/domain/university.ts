import { IClassroom, IClassroomPayload } from "./classroom";

export interface ITinyUniversity {
	id:string,
	name:string,
	profile_picture:string,
};

export interface IUniversity {
	id:string,
	name:string,
	profile_picture:string,
	classrooms:IClassroom[],
};

export interface IUniversityPayload {
	id:string,
	name:string,
	profile_picture:string,
	classrooms:IClassroomPayload[],
};