export default interface Device{
  id: string;
  name: string;
  type: DeviceType;
  householdId: string;
}

export enum DeviceType {
  DHT_22, LED_DRIVER
}
