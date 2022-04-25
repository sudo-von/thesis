import { create_battery, get_battery } from "lib/application/use_cases/battery";
import { Db } from "mongodb";
import { BatteryMongoRepository } from "lib/infrastructure/repositories/mongo/BatteryRepositoryMongo";
import { ContactMongoRepository } from "../repositories/mongo/ContactRepositoryMongo";
import { DepartmentMongoRepository } from "../repositories/mongo/DepartmentRepositoryMongo";
import { UserMongoRepository } from "../repositories/mongo/UserRepositoryMongo";
import { UserMoodMongoRepository } from "../repositories/mongo/UserMoodRepositoryMongo";
import { UniversityMongoRepository } from "../repositories/mongo/UniversityRepositoryMongo";
import { AdviceMongoRepository } from "../repositories/mongo/AdviceRepositoryMongo";
import { SuggestionMongoRepository } from "../repositories/mongo/SuggestionRepositoryMongo";
import { create_advice, get_advice } from "lib/application/use_cases/advice";
import { create_contact, get_contact } from "lib/application/use_cases/contact";
import { create_department, get_department } from "lib/application/use_cases/department";
import { create_suggestion, get_suggestion } from "lib/application/use_cases/suggestion";
import { create_university, get_university } from "lib/application/use_cases/university";
import { create_userMood, get_userMood } from "lib/application/use_cases/userMood";
import { create_user, get_user } from "lib/application/use_cases/user";
import payload from "lib/infrastructure/config/payload";

const createServer = async (database:Db) => {

  console.log("Populating database...");

  /* Repositories. */
  const adviceRepository = new AdviceMongoRepository(database);
  const batteryRepository = new BatteryMongoRepository(database);
  const contactRepository = new ContactMongoRepository(database);
  const departmentRepository = new DepartmentMongoRepository(database);
  const suggestionRepository = new SuggestionMongoRepository(database);
  const universityRepository = new UniversityMongoRepository(database);
  const userMoodRepository = new UserMoodMongoRepository(database);
  const userRepository = new UserMongoRepository(database);

  /* Use cases. */
  const advices = await get_advice(adviceRepository);
  const batteries = await get_battery(batteryRepository);
  const contacts = await get_contact(contactRepository);
  const departments = await get_department(departmentRepository);
  const suggestions = await get_suggestion(suggestionRepository);
  const universities = await get_university(universityRepository);
  const usersMood = await get_userMood(userMoodRepository);
  const users = await get_user(userRepository);

  /* Checks if every use case is empty, if it's then will populate that table using each respective payload. */
  if(advices.length === 0){
    console.log("Populating advices...");
    await create_advice(payload.advicePayload, adviceRepository);
  }

  if(batteries.length === 0){
    console.log("Populating batteries...");
    await create_battery(payload.batteryPayload, batteryRepository);
  }

  if(contacts.length === 0){
    console.log("Populating contacts...");
    await create_contact(payload.contactPayload, contactRepository);
  }

  if(departments.length === 0){
    console.log("Populating departments...");
    await create_department(payload.departmentPayload, departmentRepository);
  }

  if(suggestions.length === 0){
    console.log("Populating suggestions...");
    await create_suggestion(payload.suggestionPayload, suggestionRepository);
  }

  if(universities.length === 0){
    console.log("Populating universities...");
    await create_university(payload.universityPayload, universityRepository);
  }

  if(usersMood.length === 0){
    console.log("Populating users_mood...");
    await create_userMood(payload.userMoodPayload, userMoodRepository);
  }

  if(users.length === 0){
    console.log("Populating users...");
    await create_user(payload.userPayload, userRepository);
  }

  console.log("Populating done...");


};

export default createServer;
