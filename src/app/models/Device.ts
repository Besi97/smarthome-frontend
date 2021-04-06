interface Device{
  id: string;
  name: string;
  type: DeviceType;
  householdId: string;
}

enum DeviceType {
  DHT_22, LED_DRIVER
}
