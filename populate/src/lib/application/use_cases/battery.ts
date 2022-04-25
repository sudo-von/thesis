import { IBattery, IBatteryPayload } from "lib/domain/battery";
import { IBatteryRepository } from "lib/domain/battery.repository";

export const get_battery = async (batteryRepository:IBatteryRepository): Promise<IBattery[]> => {
  return await batteryRepository.get();
};

export const create_battery = async (batteryPayload:IBatteryPayload, batteryRepository:IBatteryRepository): Promise<void> => {
  await batteryRepository.persist(batteryPayload);
};