import {Injectable} from '@angular/core';
import {SmarthomeService} from './smarthome.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {map} from 'rxjs/operators';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {

  private householdsPath = 'households';
  private householdsCollection = 'households';

  constructor(
    private smarthomeService: SmarthomeService,
    private firestore: AngularFirestore
  ) {
  }

  getHousehold(householdId: string): Observable<Household> {
    return this.firestore.collection(this.householdsCollection).doc<Household>(householdId).get().pipe(
      map<DocumentSnapshot<Household>, Household>(document => document.data())
    );
  }

  listHouseholds(): Observable<Household[]> {
    return this.firestore.collection<Household>(this.householdsCollection).get().pipe(
      map<QuerySnapshot<Household>, Household[]>(query => query.docs.map(document => document.data()))
    );
  }

  postHousehold(name: string): Observable<Household> {
    const payload: StringWrapper = {data: name};
    return this.smarthomeService.post<Household>(this.householdsPath, payload);
  }

  updateHouseholdName(householdId: string, newName: string): Observable<Household> {
    const payload: StringWrapper = {data: newName};
    return this.smarthomeService.put<Household>(`${this.householdsPath}/${householdId}`, payload);
  }

  addDeviceToHousehold(householdId: string, deviceId: string): Observable<Household> {
    const payload: StringWrapper = {data: deviceId};
    return this.smarthomeService.put<Household>(`${this.householdsPath}/${householdId}/devices`, payload);
  }

  removeDeviceFromHousehold(householdId: string, deviceId: string): Observable<Household> {
    return this.smarthomeService.delete<Household>(`${this.householdsPath}/${householdId}/devices/${deviceId}`);
  }

  addUserToHousehold(householdId: string, userEmail: string): Observable<Household> {
    const payload: StringWrapper = {data: userEmail};
    return this.smarthomeService.put<Household>(`${this.householdsPath}/${householdId}/users`, payload);
  }

}
