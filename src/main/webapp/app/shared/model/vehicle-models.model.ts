import { Moment } from 'moment';
import { IVehicles } from 'app/shared/model/vehicles.model';
import { IMotors } from 'app/shared/model/motors.model';
import { ITransmission } from 'app/shared/model/transmission.model';
import { ISteering } from 'app/shared/model/steering.model';
import { INationalities } from 'app/shared/model/nationalities.model';
import { IParts } from 'app/shared/model/parts.model';

export interface IVehicleModels {
  id?: number;
  vehicleModel?: string;
  startProduction?: Moment;
  finishProduction?: Moment;
  startChassi?: string;
  fineshChassi?: string;
  code?: string;
  fleetQuantity?: number;
  vehicles?: IVehicles;
  motors?: IMotors;
  transmission?: ITransmission;
  steering?: ISteering;
  nationalities?: INationalities;
  parts?: IParts[];
}

export class VehicleModels implements IVehicleModels {
  constructor(
    public id?: number,
    public vehicleModel?: string,
    public startProduction?: Moment,
    public finishProduction?: Moment,
    public startChassi?: string,
    public fineshChassi?: string,
    public code?: string,
    public fleetQuantity?: number,
    public vehicles?: IVehicles,
    public motors?: IMotors,
    public transmission?: ITransmission,
    public steering?: ISteering,
    public nationalities?: INationalities,
    public parts?: IParts[]
  ) {}
}
