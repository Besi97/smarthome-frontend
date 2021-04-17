import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { observe } from 'rxjs-observe';

// TODO: Replace this with your own data model type
export interface IDeviceItem {
  id: string;
  name: string;
  type: DeviceType;
}

class DeviceItem implements IDeviceItem {
  id: string;
  name: string;
  type: DeviceType;
  device: Device;

  constructor(device: Device) {
    this.id = device.id;
    this.name = device.name ? device.name : this.id;
    this.type = device.type
    this.device = device;
  }
}

/**
 * Data source for the Devices view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DevicesDataSource extends DataSource<IDeviceItem> {
  devices: {devices: IDeviceItem[]} = {devices: []};
  devicesObservable: Observable<IDeviceItem[]>;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    private deviceService: DeviceService
  ) {
    super();
    const {observables, proxy} = observe(this.devices);
    this.devices = proxy;
    this.devicesObservable = observables.devices;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IDeviceItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      this.deviceService.listDevices().subscribe({
        next: (devices: Device[]) => {
          this.devices.devices = devices.map(device => new DeviceItem(device));
        }
      })
      return merge(this.devicesObservable, this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.devices.devices]));
        })
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IDeviceItem[]): IDeviceItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IDeviceItem[]): IDeviceItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
