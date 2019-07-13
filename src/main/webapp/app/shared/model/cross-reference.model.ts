import { IProviders } from 'app/shared/model/providers.model';
import { IParts } from 'app/shared/model/parts.model';

export interface ICrossReference {
  id?: number;
  codeInProvider?: string;
  viewCatalog?: boolean;
  providers?: IProviders;
  parts?: IParts;
}

export class CrossReference implements ICrossReference {
  constructor(
    public id?: number,
    public codeInProvider?: string,
    public viewCatalog?: boolean,
    public providers?: IProviders,
    public parts?: IParts
  ) {
    this.viewCatalog = this.viewCatalog || false;
  }
}
