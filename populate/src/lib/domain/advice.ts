import { IClassroom } from "./classroom";
import { ITinyUser } from "./user";

export interface IAdvice {
	id:string,         
	user:ITinyUser,
	classroom:IClassroom,
	university_id:string,
	subject:string, 
	advice_date:Date,         
	students_will_attend:string[],
	status:string
	creation_date:Date,
};

export interface IAdvicePayload {
	id:string,
	user_id:string,
	classroom_id:string,
	university_id:string,
	subject:string,
	advice_date:Date,
	students_will_attend:string[],
	status:string,
	creation_date:Date,
};