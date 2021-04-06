import {Injectable} from '@angular/core';
import {SmarthomeService} from './smarthome.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private smarthomeService: SmarthomeService
  ) {
  }

  // TODO: get device from Firestore

  postDevice(type: DeviceType): Observable<Device> {
    const payload: DeviceTypeWrapper = {type};
    return this.smarthomeService.post<Device>('devices', payload);
  }

  updateDeviceName(deviceId: string, newName: string): Observable<Device> {
    const payload: StringWrapper = {data: newName};
    return this.smarthomeService.put<Device>(`devices/${deviceId}`, payload);
  }

}
