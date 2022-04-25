import { IBattery, IBatteryPayload } from "./battery";

export interface IBatteryRepository {
  get: () => Promise<IBattery[]>;
  persist: (advicePayload:IBatteryPayload) => Promise<void>;
};