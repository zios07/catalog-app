import { IVehicleModels } from 'app/shared/model/vehicle-models.model';
import { IFamilies } from 'app/shared/model/families.model';

export interface IParts {
  id?: number;
  codeParts?: string;
  partsName?: string;
  partImageLinkPic360?: string;
  partVideo?: string;
  partTechnicalManual?: string;
  underDevelopment?: boolean;
  inactive?: boolean;
  ean?: string;
  sku?: string;
  vehicleModels?: IVehicleModels[];
  families?: IFamilies;
  technicalManual: any;
}

export class Parts implements IParts {
  constructor(
    public id?: number,
    public codeParts?: string,
    public partsName?: string,
    public partImageLinkPic360?: string,
    public partVideo?: string,
    public partTechnicalManual?: string,
    public underDevelopment?: boolean,
    public inactive?: boolean,
    public ean?: string,
    public sku?: string,
    public vehicleModels?: IVehicleModels[],
    public families?: IFamilies,
    public technicalManual?: any
  ) {
    this.underDevelopment = this.underDevelopment || false;
    this.inactive = this.inactive || false;
  }
}
