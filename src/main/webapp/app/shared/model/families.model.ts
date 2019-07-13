import { ICharacteristics } from 'app/shared/model/characteristics.model';
import { IParts } from 'app/shared/model/parts.model';
import { ILines } from 'app/shared/model/lines.model';

export interface IFamilies {
  id?: number;
  familyName?: string;
  familyImage?: string;
  familyIcon?: string;
  characteristics?: ICharacteristics[];
  parts?: IParts[];
  lines?: ILines;
}

export class Families implements IFamilies {
  constructor(
    public id?: number,
    public familyName?: string,
    public familyImage?: string,
    public familyIcon?: string,
    public characteristics?: ICharacteristics[],
    public parts?: IParts[],
    public lines?: ILines
  ) {}
}
