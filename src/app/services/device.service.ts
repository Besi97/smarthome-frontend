import {Injectable} from '@angular/core';
import {SmarthomeService} from './smarthome.service';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import Device, { DeviceType } from '../models/Device';
import StringWrapper from '../models/StringWrapper';
import DeviceTypeWrapper from '../models/DeviceTypeWrapper';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesPath = 'devices';
  private devicesCollection = 'devices';

  constructor(
    private smarthomeService: SmarthomeService,
    private firestore: AngularFirestore
  ) {
  }

  getDevice(deviceId: string): Observable<Device> {
    return this.firestore.collection(this.devicesCollection).doc<Device>(deviceId).get().pipe(
      map<DocumentSnapshot<Device>, Device>(document => document.data())
    );
  }

  listDevices(): Observable<Device[]> {
    return this.firestore.collection<Device>(this.devicesCollection).get().pipe(
      map<QuerySnapshot<Device>, Device[]>(query => query.docs.map(document => document.data()))
    );
  }

  postDevice(type: DeviceType): Observable<Device> {
    return this.smarthomeService.post<DeviceTypeWrapper, Device>(this.devicesPath, {type});
  }

  updateDeviceName(deviceId: string, newName: string): Observable<Device> {
    return this.smarthomeService.put<StringWrapper, Device>(`${this.devicesPath}/${deviceId}/name`, {data: newName});
  }

}
