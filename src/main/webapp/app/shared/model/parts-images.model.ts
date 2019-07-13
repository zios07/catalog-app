import { IParts } from 'app/shared/model/parts.model';

export interface IPartsImages {
  id?: number;
  partImage?: string;
  parts?: IParts;
}

export class PartsImages implements IPartsImages {
  constructor(public id?: number, public partImage?: string, public parts?: IParts) {}
}
