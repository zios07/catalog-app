import { IVehicles } from 'app/shared/model/vehicles.model';

export interface IVehicleBrands {
  id?: number;
  vehicleBrandName?: string;
  vehicleBrandImage?: string;
  vehicles?: IVehicles[];
}

export class VehicleBrands implements IVehicleBrands {
  constructor(public id?: number, public vehicleBrandName?: string, public vehicleBrandImage?: string, public vehicles?: IVehicles[]) {}
}
