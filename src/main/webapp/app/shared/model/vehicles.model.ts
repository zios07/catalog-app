import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';

export interface IVehicles {
  id?: number;
  vehicle?: string;
  code?: string;
  vehicleBrands?: IVehicleBrands;
}

export class Vehicles implements IVehicles {
  constructor(public id?: number, public vehicle?: string, public code?: string, public vehicleBrands?: IVehicleBrands) {}
}
