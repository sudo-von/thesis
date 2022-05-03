/* eslint-disable no-console */
import * as BackgroundFetch from 'expo-background-fetch';
import { getBatteryFromDevice, createBattery } from './battery.service';

export const BATTERY_TASK = 'BATTERY_TASK';

export const handleBatteryBackgroundTask = async () => {
  try {
    const payload = await getBatteryFromDevice();
    createBattery(payload);
  } catch (err) {
    console.log(err);
  }
};

export const registerBackgroundTask = async (TASK_NAME:string, seconds:number) => {
  try {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: seconds,
    });
  } catch (err) {
    console.log(err);
  }
};
