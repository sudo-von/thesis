import { IAdvicePayload } from "lib/domain/advice";
import { IBatteryPayload } from "lib/domain/battery";
import { IContactPayload } from "lib/domain/contact";
import { IDepartmentPayload } from "lib/domain/department";
import { ISuggestionPayload } from "lib/domain/suggestion";
import { IUniversityPayload } from "lib/domain/university";
import { IUserPayload } from "lib/domain/user";
import { IUserMoodPayload } from "lib/domain/userMood";

interface IPayload {
  advicePayload: IAdvicePayload,
  batteryPayload: IBatteryPayload,
  contactPayload: IContactPayload,
  departmentPayload: IDepartmentPayload,
  suggestionPayload: ISuggestionPayload,
  universityPayload: IUniversityPayload,
  userPayload: IUserPayload,
  userMoodPayload: IUserMoodPayload,
};

const payload:IPayload = {
  advicePayload: {
    id:"62649782413bcd5d6de63580",
    user_id:"626497896c987f8bf681fd85",
    classroom_id:"6264978d84d4b35fe7a941e4",
    university_id:"626497aefb94e07bc33a4724",
    subject:"Programación II",
    advice_date:new Date(2022,0,1),
    students_will_attend:["626497896c987f8bf681fd85"],
    status:"active",
    creation_date:new Date(2022,0,1),
  },
  batteryPayload: {
    id:"626498968d9abbf0307b00f1",
    battery_level:80,
    low_power_mode:false,
    battery_state:"Fake battery state",
    creation_date:new Date(2022,0,1),
  },
  contactPayload: {
    id:"6264992f67de832e006d8203",
    user_id:"626497896c987f8bf681fd85",
    contact_name:"Contacto de prueba",
    contact_number:"528662047280",
    message:"Este es un mensaje de prueba",
    creation_date:new Date(2022,0,1),
  },
  departmentPayload: {
    id:"626499624c84c3dd7a13400e",
    user_id:"626497896c987f8bf681fd85",
    university_id:"626497aefb94e07bc33a4724",
    description:"Cerca de rectoría, al lado de una estética",
    street:"Salvador González Lobo",
    neighborhood:"República Oriente",
    cost: 10000,
    status:"active",
    available:true,
    creation_date:new Date(2022,1,1),
  },
  suggestionPayload: {
    id:"626499c75bea776bf7abc99f",
    user_id:"626497896c987f8bf681fd85",
    suggestion:"Sugerencia de prueba",
    creation_date:new Date(2022,1,1),
  },
  universityPayload: {
    id:"626497aefb94e07bc33a4724",
    name:"Universidad de prueba",
    profile_picture:"https://www.canva.com/design/DAE-ky9MBko/view",
    classrooms:[
      {
        id:"6264978d84d4b35fe7a941e4",
        name:"Salón de prueba",
      }
    ],
  },
  userPayload: {
    id:"626497896c987f8bf681fd85",
    name:"Valeria Soto",
    birth_date:new Date(2022,1,1),
    email:"valeria-soto@uadec.edu.mx",
    registration_number:"16190777",
    password:"$2a$10$cOsowjRCvKuRReYptXoM5usMithfxgD.m6puvmNLj8vx3wed.HkXu",
    university_id:"626497aefb94e07bc33a4724",
    status:"active",
    role:"student",
    creation_date:new Date(2022,1,1),
  },
  userMoodPayload: {
    id:"62649ae10990135810e51fd6",
    user_id:"626497896c987f8bf681fd85",
    mood:5,
    creation_date:new Date(2022,1,1),
  },
};

export default payload;
