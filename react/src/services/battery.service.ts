import { BatteryPayload } from 'src/entities/battery';
import { post } from 'src/helpers/protected-axios-helper';
import * as Battery from 'expo-battery';

const getBatteryFromDevice = async (): Promise<BatteryPayload> => {
  const batteryLevel = await Battery.getBatteryLevelAsync();
  const batteryState = await Battery.getBatteryStateAsync();
  const lowPowerMode = await Battery.isLowPowerModeEnabledAsync();

  const payload:BatteryPayload = {
    batteryLevel,
    batteryState: batteryState.toString(),
    lowPowerMode,
  };

  return payload;
};

const createBattery = async (batteryPayload:BatteryPayload): Promise<void> => {
  await post('/batteries', batteryPayload);
};

export {
  createBattery,
  getBatteryFromDevice,
};
