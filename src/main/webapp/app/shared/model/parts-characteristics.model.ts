import { IParts } from 'app/shared/model/parts.model';
import { ICharacteristics } from 'app/shared/model/characteristics.model';

export interface IPartsCharacteristics {
  id?: number;
  information?: string;
  parts?: IParts;
  characteristics?: ICharacteristics;
}

export class PartsCharacteristics implements IPartsCharacteristics {
  constructor(public id?: number, public information?: string, public parts?: IParts, public characteristics?: ICharacteristics) {}
}
