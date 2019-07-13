import { IFamilies } from 'app/shared/model/families.model';

export interface ICharacteristics {
  id?: number;
  characteristicsName?: string;
  viewCatalog?: boolean;
  viewSpecialClient?: boolean;
  families?: IFamilies;
}

export class Characteristics implements ICharacteristics {
  constructor(
    public id?: number,
    public characteristicsName?: string,
    public viewCatalog?: boolean,
    public viewSpecialClient?: boolean,
    public families?: IFamilies
  ) {
    this.viewCatalog = this.viewCatalog || false;
    this.viewSpecialClient = this.viewSpecialClient || false;
  }
}
